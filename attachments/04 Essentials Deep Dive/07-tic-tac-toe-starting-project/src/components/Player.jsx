import { useState } from "react"

export default function Player({ name, symbol, isActive, onNameChange }) {
    const [playerName, setPlayerName] = useState(name); // do not lift state up
    const [isEditing, setIsEditing] = useState(false);

    // ## Exercise Time!
    // Pause the video and try completing these tasks on your own
    // After the pause, I'll show you my solution & implementation
    // ---
    // ### Exercise Tasks
    // 1) Add a function that's triggered when the `<button>` is clicked
    // 2) Change `isEditing` to `true` in that function
    // 3) Show the `<span className="player-name">` only when `isEditing` is false
    // 4) Show an `<input>` element (which does not need to work) if `isEditing` is true
    // ***

    function handleEditClick() {
        // setIsEditing(isEditing ? false : true);
        // setIsEditing(!isEditing); // schedules a state update based on the last updated state value
        setIsEditing((editing) => !editing); // schedules a state update based on the latest available state value
        if (isEditing) {
            onNameChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        // console.log(event);
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = "Edit";
    if (isEditing) {
        // playerName = <input type="text" required defaultValue={name} />;
        // playerName = <input type="text" required Value={name} />;
        // btnCaption = "Save";
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />; // two-way binding
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}
          