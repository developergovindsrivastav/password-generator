import { useState, useCallback, useEffect, useRef } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numberallwed, setnumberallowed] = useState(false);
  const [charallowed, setcharallowed] = useState(false);
  const [passwordallowed, setpasswordallowed] = useState("");
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberallwed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*-_+=[]{}~`";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
      setpasswordallowed(pass);
    }
  }, [length, numberallwed, charallowed, setpasswordallowed]);
  useEffect(() => {
    passwordgenerator();
  }, [length, numberallwed, charallowed, setpasswordallowed]);
  const refhold = useRef(null);
  const copytoclipboard = useCallback(() => {
    refhold.current?.select();

    window.navigator.clipboard.writeText(passwordallowed);
  }, [passwordallowed]);


  return (
    <div className="  w-1/2   mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={passwordallowed}
          ref={refhold}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          className="outline-none text-xl uppercase hover:bg-blue-500   bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={copytoclipboard()}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberallwed}
            id="numberInput"
            onChange={() => {
              setnumberallowed((numberallwed) => !numberallwed);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charallowed}
            id="characterInput"
            onChange={() => {
              setcharallowed((charallowed) => !charallowed);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
