import EventsTable from "../components/events-table/EventsTable";

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white">Events Management</h1>
        <p className="text-gray-400">Manage, track, and organize all your events in one place.</p>
      </div>

      <EventsTable />
    </div>
  );
}
