import { NextRequest, NextResponse } from 'next/server'
import { DatabaseService } from '@/lib/database'

// POST /api/user - Create or update user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { wallet_address, email, phone, login_method } = body

    if (!wallet_address) {
      return NextResponse.json(
        { error: 'wallet_address is required' },
        { status: 400 }
      )
    }

    if (!login_method) {
      return NextResponse.json(
        { error: 'login_method is required' },
        { status: 400 }
      )
    }

    // Create or update user in database (this runs on server, so supabaseAdmin is available)
    const user = await DatabaseService.createOrUpdateUser({
      wallet_address,
      email,
      phone,
      login_method
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create or update user' },
        { status: 500 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('❌ API Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/user?wallet_address=0x... - Get user by wallet address
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const walletAddress = searchParams.get('wallet_address')

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'wallet_address query parameter is required' },
        { status: 400 }
      )
    }

    const user = await DatabaseService.getUserByWallet(walletAddress)

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('❌ API Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
