const url = "http://localhost:8080/store/items";

const MyFirstComponent = (props) => {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const response = await fetch(url);
    const items = await response.json();
    setItems(items);
    console.log(items);
  };
};

export default MyFirstComponent;
