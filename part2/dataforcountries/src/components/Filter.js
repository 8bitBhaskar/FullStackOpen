const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <form>
        <div>
          find countries <input value={filter} onChange={handleFilter} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
