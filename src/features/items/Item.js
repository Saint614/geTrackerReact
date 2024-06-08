const Item = ({ item }) => {
  if (item) {
    const { name, examine, value } = item;
    console.log(item);

    return (
      <div className="m-4">
        <h5 className="fw-bold">{name}</h5>
        <p>In-Game Examine Text: {examine}</p>
        Value: {value}
      </div>
    );
  }
  return null;
};

export default Item;
