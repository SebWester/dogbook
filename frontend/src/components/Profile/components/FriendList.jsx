import { Link } from "react-router-dom";

function FriendList({ friends }) {
  if (friends.length === 0) {
    return <li style={{ fontStyle: "italic" }}>No friends to display</li>;
  }

  return friends.map((friend) => (
    <li key={friend._id}>
      <Link to={`/profile/${friend.name}`} state={friend}>
        {friend.name}
      </Link>
    </li>
  ));
}

export default FriendList;
