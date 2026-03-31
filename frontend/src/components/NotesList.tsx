import { useEffect, useState } from "react";

type Session = {
  _id: string;
  text: string;
  createdAt?: string;
};

function NotesList() {
  const [notes, setNotes] = useState<Session[]>([]);
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState<Session | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch(
          "https://vi-notes-4.onrender.com/api/sessions"
        );
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchNotes();
  }, []);

 
  const filteredNotes = notes
    .filter((note) =>
      note.text.toLowerCase().includes(search.toLowerCase())
    )
    .reverse()
    .slice(0, 10);

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>My Notes</h3>

      {/* 🔍 Search */}
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      />

     
      <div style={{ overflowY: "auto" }}>
        {filteredNotes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note._id}
              onClick={() => setSelectedNote(note)}
              style={{
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "10px",
                background: "#fff0f5",
                border: "1px solid #fbcfe8",
                cursor: "pointer",
              }}
            >
              {note.text.slice(0, 100)}...
            </div>
          ))
        )}
      </div>

  
      {selectedNote && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            borderRadius: "10px",
            background: "#ecfdf5",
            border: "1px solid #34d399",
          }}
        >
          <h4>Full Note</h4>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {selectedNote.text}
          </p>

          <button
            onClick={() => setSelectedNote(null)}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#333",
              color: "white",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default NotesList;