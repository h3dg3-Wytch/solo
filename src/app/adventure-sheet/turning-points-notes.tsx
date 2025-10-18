'use client';

export function TurningPointNotes({ entry }) {

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Notes</h2>
            <textarea
              rows={4}
              className="w-full border rounded-lg p-2"
              placeholder="Enter notes here..."
              value={entry.notes}
                onChange={() => {}}
            />
        </div>
    );
}