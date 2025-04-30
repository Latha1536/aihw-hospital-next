import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('WAHospital-resus-emerg-urgency');
  const collection = db.collection('aihws');

  if (req.method === 'GET') {
    const data = await collection.find({}).toArray();
    res.json(data);
  } else if (req.method === 'POST') {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ error: 'Hospital code already exists.' });
      } else {
        res.status(500).json({ error: 'Server error' });
      }
    }
  } else if (req.method === 'DELETE') {
    const { code } = req.body;
    const result = await collection.deleteOne({ code });
    res.status(200).json(result);
  } else if (req.method === 'PATCH') {
    const { code, update } = req.body;
    const result = await collection.updateOne({ code }, { $set: update });
    res.status(200).json(result);
  } else {
    res.status(405).end(); // Method Not Allowed

  }
}
