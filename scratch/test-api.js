
import axios from 'axios';

async function test() {
  const url = "http://localhost:5000/api/v1";
  try {
    const data = await axios.get(`${url}/career`);
    console.log("Success! Found " + data.data.data.length + " careers.");
    console.log("First career title: " + data.data.data[0].title);
    console.log("First career slugified: " + data.data.data[0].title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-'));
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

test();
