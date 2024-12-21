const FilterBar = ({ setFilter }) => {
  return (
    <div className="filter-bar">
      <select onChange={(e) => setFilter({ status: e.target.value })}>
        <option value="">Status</option>
        <option value="slutförd">Slutförd</option>
        <option value="ej utförd">Ej utförd</option>
      </select>

      <select onChange={(e) => setFilter({ category: e.target.value })}>
        <option value="">Kategorier</option>
        <option value="hälsa">Hälsa</option>
        <option value="hushåll">Hushåll</option>
        <option value="jobb">Jobb</option>
      </select>
    </div>
  );
};

export default FilterBar;
