import './InitialLoader.css';

const InitialLoader = ({ fade }) => (
  <div className={`loader-container${fade ? ' fade-out' : ''}`}>
    <svg viewBox="0 0 400 160">
      <text x="50%" y="50%" dy="0.32rem" className="text-body">Archivus</text>
      <text x="50%" y="50%" dy="0.32rem" dx="2em" className="text-body dot">.</text>
    </svg>
  </div>
);

export default InitialLoader;