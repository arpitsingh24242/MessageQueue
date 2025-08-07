import React, { useState } from "react";
import axios from "axios";
import "./app.css";

export default function App() {
  const [id, setId] = useState("");
  const [priority, setPriority] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [output, setOutput] = useState("");
  const [searchId, setSearchId] = useState("");

  const BASE_URL = "https://priorityqueuebackendapi.onrender.com";

  const handleAdd = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/add`, {
        id,
        priority: parseInt(priority),
        timestamp: parseInt(timestamp),
      });

      if (res.data.error) {
        setOutput("Error: " + res.data.error);
      } else {
        setOutput(res.data.message);
      }
    } catch (err) {
      setOutput("Failed to add message. Please check the inputs.");
    }
  };

  const handlePop = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/pop`);
      setOutput(res.data.id ? `Popped: ${res.data.id}` : "Queue is empty");
    } catch (err) {
      setOutput("Failed to pop message.");
    }
  };

  const handleFind = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/find/${searchId}`);
      if (res.data && res.data.priority !== undefined) {
        setOutput(
          `Priority: ${res.data.priority}, Timestamp: ${res.data.timestamp}`
        );
      } else {
        setOutput("Message not found");
      }
    } catch (err) {
      setOutput("Error while finding message.");
    }
  };

  const handleList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/list`);
      setOutput("Messages: " + res.data.join(", "));
    } catch (err) {
      setOutput("Failed to list messages.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Message Queue</h1>

      <div className="section">
        <input
          type="text"
          placeholder="Message ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Priority (1-100)"
          value={priority}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setPriority(val);
            }
          }}
          className="input"
        />
        <input
          type="text"
          placeholder="Timestamp"
          value={timestamp}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setTimestamp(val);
            }
          }}
          className="input"
        />
        <button onClick={handleAdd} className="button add">
          Add Message
        </button>
      </div>

      <div className="section">
        <button onClick={handlePop} className="button pop">
          Pop Message
        </button>
      </div>

      <div className="section">
        <input
          type="text"
          placeholder="Find by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input"
        />
        <button onClick={handleFind} className="button find">
          Find Message
        </button>
      </div>

      <div className="section">
        <button onClick={handleList} className="button list">
          List Messages
        </button>
      </div>

      <div className="output">{output}</div>
    </div>
  );
}
