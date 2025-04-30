import { useEffect, useState } from 'react';
export default function Home() {
  const [hospitals, setHospitals] = useState([]);
  const [newHospital, setNewHospital] = useState({ code: '', name: '', values: { 41: 0, 42: 0, 43: 0 } });
  useEffect(() => {
    fetch('/api/hospitals').then(res => res.json()).then(setHospitals);
  }, []);
  const addHospital = async () => {
    await fetch('/api/hospitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newHospital),
    });
    location.reload();
  };
  const deleteHospital = async (code) => {
    await fetch('/api/hospitals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    location.reload();
  };
  return (
    <div style={{ padding: 20 }}>
      <h1>WA Hospitals</h1>
      <ul>
        {hospitals.map(h => (
  <li key={h._id} style={{ marginBottom: '1rem' }}>
    <strong>{h.code}</strong> - {h.name}
    <br />
    41: {h.values?.["41"] ?? "N/A"}, 
    42: {h.values?.["42"] ?? "N/A"}, 
    43: {h.values?.["43"] ?? "N/A"}

    <button
      onClick={() => {
        const newCode = prompt('Enter new hospital code:', h.code);
        if (newCode && newCode !== h.code) {
          fetch('/api/hospitals', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: h.code,
              update: { code: newCode }
            })
          }).then(() => location.reload());
        }
      }}
    >
      ✏️ Edit Code
    </button>

    <button
      onClick={() => {
        const newName = prompt('Enter new hospital name:', h.name);
        const v41 = prompt('Update value for 41:', h.values?.["41"] ?? "");
        const v42 = prompt('Update value for 42:', h.values?.["42"] ?? "");
        const v43 = prompt('Update value for 43:', h.values?.["43"] ?? "");
        if (newName || v41 || v42 || v43) {
          fetch('/api/hospitals', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: h.code,
              update: {
                name: newName,
                values: {
                  41: v41,
                  42: v42,
                  43: v43,
                },
              },
            }),
          }).then(() => location.reload());
        }
      }}
    >
      ✏️ Edit
    </button>

    <button onClick={() => deleteHospital(h.code)}>🗑</button>
  </li>
))}

      </ul>
      <hr />
      <h2>Add Hospital</h2>
      <input placeholder="Code" onChange={e => setNewHospital({ ...newHospital, code: e.target.value })} />
      <input placeholder="Name" onChange={e => setNewHospital({ ...newHospital, name: e.target.value })} />
      <input placeholder="41" type="number" onChange={e => setNewHospital({ ...newHospital, values: { ...newHospital.values, 41: +e.target.value } })} />
      <input placeholder="42" type="number" onChange={e => setNewHospital({ ...newHospital, values: { ...newHospital.values, 42: +e.target.value } })} />
      <input placeholder="43" type="number" onChange={e => setNewHospital({ ...newHospital, values: { ...newHospital.values, 43: +e.target.value } })} />
      <button onClick={addHospital}>Add</button>
    </div>
  );
}