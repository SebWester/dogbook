function AddFriendList({ otherDogs, friendsDetails, dogId, onFriendRequest }) {
  return otherDogs
    .filter((d) => !friendsDetails.some((f) => f._id === d._id))
    .map((d) => (
      <li key={d._id} className="add-friend-div">
        <button onClick={() => onFriendRequest(dogId, d._id)}>
          + {d.name}
        </button>
      </li>
    ));
}

export default AddFriendList;
