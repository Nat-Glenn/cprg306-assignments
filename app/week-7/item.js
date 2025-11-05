export default function Item(props){

    let {name, quantity, category} = props;

    return(

  <div className="p-4 bg-white shadow-md rounded-lg my-4">
    <ul className="list-disc list-inside">
      <li className="text-lg font-semibold">Name: <span className="font-normal">{name}</span></li>
      <li className="text-lg font-semibold">Quantity: <span className="font-normal">{quantity}</span></li>
      <li className="text-lg font-semibold">Category: <span className="font-normal">{category}</span></li>
    </ul>
  </div>
    );

}