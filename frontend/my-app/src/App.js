import './App.css';

function App() {
  return (
    <div className="App">
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image" />
        <button type="sumbit">sumbit</button>
      </form>
    </div>
  );
}

export default App;
