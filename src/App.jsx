const games = [
  { name: 'Valorant', mode: 'Ranked • 5v5', accent: 'crimson', status: 'Online' },
  { name: 'Apex Legends', mode: 'Battle Royale', accent: 'gold', status: 'Online' },
  { name: 'Fortnite', mode: 'Zero Build', accent: 'cyan', status: 'Online' },
  { name: 'League of Legends', mode: 'Ranked • 5v5', accent: 'blue', status: 'Boosted' },
];

const performanceMetrics = [
  { label: 'Frame rate', value: '240 FPS', note: 'Stable in-game output', dot: 'green' },
  { label: 'Ping', value: '14 ms', note: 'Below match threshold', dot: 'purple' },
  { label: 'CPU load', value: '42%', note: 'Optimized allocation', dot: 'yellow' },
  { label: 'Network', value: 'Excellent', note: 'Zero packet loss', dot: 'blue' },
];

const toggles = [
  'Priority mode',
  'Network clean-up',
  'Background apps stop',
  'GPU scheduler boost',
];

const activity = [
  { label: 'GPU temp', value: '64°C', stage: 'cool' },
  { label: 'RAM usage', value: '7.1 GB', stage: 'good' },
  { label: 'Disk I/O', value: 'Low', stage: 'stable' },
  { label: 'Latency burst', value: '0.2%', stage: 'excellent' },
];

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <p className="eyebrow">Performance Suite</p>
            <h1>GameBoost</h1>
          </div>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <button className="nav-item active" type="button">
            <span>🏠</span>
            Dashboard
          </button>
          <button className="nav-item" type="button">
            <span>🎮</span>
            Game Library
          </button>
          <button className="nav-item" type="button">
            <span>⚙️</span>
            Optimization
          </button>
          <button className="nav-item" type="button">
            <span>📡</span>
            Network
          </button>
          <button className="nav-item" type="button">
            <span>📈</span>
            Analytics
          </button>
        </nav>

        <div className="sidebar-card">
          <p className="card-label">Active profile</p>
          <h3>Competitive</h3>
          <div className="mini-stats">
            <span>Latency: 12ms</span>
            <span>Packet loss: 0.2%</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow alt">Welcome back</p>
            <h2>Ready to dominate your next match</h2>
          </div>
          <div className="topbar-actions">
            <button className="secondary-btn" type="button">Export report</button>
            <button className="primary-btn" type="button">Boost now</button>
          </div>
        </header>

        <section className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow alt">System optimization</p>
            <h3>Online gaming performance tuned for faster reactions</h3>
            <div className="hero-actions">
              <button className="primary-btn" type="button">Launch optimizer</button>
              <button className="secondary-btn" type="button">Safe mode</button>
            </div>
          </div>

          <div className="score-ring" aria-label="Performance score">
            <div className="ring-inner">
              <strong>96</strong>
              <span>FPS health</span>
            </div>
          </div>
        </section>

        <section className="metrics-grid" aria-label="Performance metrics">
          {performanceMetrics.map((item) => (
            <article key={item.label} className="metric-card">
              <div className="metric-header">
                <span className={`dot ${item.dot}`} />
                <span>{item.label}</span>
              </div>
              <h3>{item.value}</h3>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <div className="panel games-panel">
            <div className="panel-header">
              <h3>Supported games</h3>
              <button className="chip-btn" type="button">View all</button>
            </div>

            <div className="game-list">
              {games.map((game, index) => (
                <article key={game.name} className={`game-item ${index === 0 ? 'active-game' : ''}`}>
                  <div className="game-info">
                    <div className={`game-icon ${game.accent}`}>{game.name.charAt(0)}</div>
                    <div>
                      <h4>{game.name}</h4>
                      <p>{game.mode}</p>
                    </div>
                  </div>
                  <span className={`status ${game.status === 'Boosted' ? 'strong' : 'online'}`}>{game.status}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="panel controls-panel">
            <div className="panel-header">
              <h3>Boost controls</h3>
              <button className="chip-btn ghost" type="button">Auto</button>
            </div>

            <div className="toggle-list">
              {toggles.map((toggle, idx) => (
                <label key={toggle} className="toggle-row">
                  <span>{toggle}</span>
                  <input type="checkbox" defaultChecked={idx < 3} />
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel analytics-panel">
            <div className="panel-header">
              <h3>Live system health</h3>
              <span className="status online">Synced</span>
            </div>

            <div className="activity-list">
              {activity.map((item) => (
                <div key={item.label} className="activity-row">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  <span className={`stage ${item.stage}`}>{item.stage}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel focus-panel">
            <div className="panel-header">
              <h3>Focus mode</h3>
              <button className="chip-btn" type="button">Tune</button>
            </div>

            <div className="bars">
              <div className="bar-row">
                <label>Priority</label>
                <div className="bar-track"><span style={{ width: '92%' }} /></div>
              </div>
              <div className="bar-row">
                <label>Network</label>
                <div className="bar-track"><span style={{ width: '88%' }} /></div>
              </div>
              <div className="bar-row">
                <label>Graphics</label>
                <div className="bar-track"><span style={{ width: '95%' }} /></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
