function CheckInToggle({ id, isHere, setIsHere, onCheckIn }) {
  return (
    <span className="check-in-dog">
      <label htmlFor={id}>Is here:</label>
      <input
        type="checkbox"
        id={id}
        checked={isHere}
        onChange={() => {
          setIsHere((prev) => !prev);
          onCheckIn(id);
        }}
      />
    </span>
  );
}

export default CheckInToggle;
