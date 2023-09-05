const FilterComponent = ({ handleChange }) => {
  return (
    <div>
      find countries <input onChange={handleChange} />
    </div>
  );
};

export default FilterComponent;
