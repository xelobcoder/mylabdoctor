export default function TestStages({ data }) {
  const { name, testid, ready, processing, collection, approval } = data;
   return (
    <div className="text-capitalize">
     {name}
    </div>
  );
}