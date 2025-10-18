

export function SelectionList({ title, items }) {
    
    const useNameOrDefaultValue= (item) => item.is_default ? item.default_value : item.name;
  return (
    <div className="sticky top-0 bg-white z-10">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="border rounded-lg h-[300px] overflow-y-auto p-2">
        {items?.map((item, index) => (
          <div key={item.id} className="py-0.5 border-b last:border-b-0">
            <label className="font-semibold mr-1">{index + 1}:</label>
            <span className="text-sm">{useNameOrDefaultValue(item)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
