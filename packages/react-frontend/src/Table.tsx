// src/Table.tsx

type character = {
  name: string;
  job: string;
  id: number;
}

type table = {
  characterData: character[]
  removeCharacter: (index: number) => void
}


function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>ID</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody(props:table) {
  const rows = props.characterData.map((row:any, index:any) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row.id}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)} >
            Delete
          </button>
        </td>
      </tr>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
}``

function Table(props:table) {
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData = {props.characterData}
          removeCharacter = {props.removeCharacter}
        />
      </table>
    );
}

export default Table;