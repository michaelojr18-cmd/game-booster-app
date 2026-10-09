import { useEffect, useMemo, useState } from 'react';

const starterGames = [
  { name: 'Valorant', mode: 'Ranked • 5v5', accent: 'crimson', status: 'Online' },
  { name: 'Apex Legends', mode: 'Battle Royale', accent: 'gold', status: 'Online' },
  { name: 'Fortnite', mode: 'Zero Build', accent: 'cyan', status: 'Online' },
  { name: 'League of Legends', mode: 'Ranked • 5v5', accent: 'blue', status: 'Boosted' },
];

const starterProfiles = [
  { name: 'Competitive', latency: 12, packetLoss: 0.2, fps: 240, focus: 92 },
  { name: 'Casual', latency: 24, packetLoss: 0.5, fps: 120, focus: 74 },
  { name: 'Streaming', latency: 18, packetLoss: 0.3, fps: 165, focus: 86 },
];

const baseMetrics = [
  { label: 'Frame rate', value: '240 FPS', note: 'Stable in-game output', dot: 'green' },
  { label: 'Ping', value: '14 ms', note: 'Below match threshold', dot: 'purple' },
  { label: 'CPU load', value: '42%', note: 'Optimized allocation', dot: 'yellow' },
  { label: 'Network', value: 'Excellent', note: 'Zero packet loss', dot: 'blue' },
];

const defaultToggles = [
  { name: 'Priority mode', enabled: true },
  { name: 'Network clean-up', enabled: true },
  { name: 'Background apps stop', enabled: true },
  { name: 'GPU scheduler boost', enabled: false },
];

const activity = [
  { label: 'GPU temp', value: '64°C', stage: 'cool' },
  { label: 'RAM usage', value: '7.1 GB', stage: 'good' },
  { label: 'Disk I/O', value: 'Low', stage: 'stable' },
  { label: 'Latency burst', value: '0.2%', stage: 'excellent' },
];

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('gameboost-user');
    return savedUser || 'Milo';
  });

  const [profileName, setProfileName] = useState('Competitive');
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('gameboost-profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : starterProfiles;
  });

  const [toggles, setToggles] = useState(() => {
    const savedToggles = localStorage.getItem('gameboost-toggles');
    return savedToggles ? JSON.parse(savedToggles) : defaultToggles;
  });

  const [liveScore, setLiveScore] = useState(96);
  const [showLogin, setShowLogin] = useState(false);
  const [loginValue, setLoginValue] = useState(user);
  const [customProfile, setCustomProfile] = useState('');
  const [selectedGame, setSelectedGame] = useState(starterGames[0].name);

  useEffect(() => {
    localStorage.setItem('gameboost-user', user);
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gameboost-profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('gameboost-toggles', JSON.stringify(toggles));
  }, [toggles]);

  const currentProfile = useMemo(
    () => profiles.find((entry) => entry.name === profileName) || profiles[0],
    [profileName, profiles]
  );

  const handleBoost = () => {
    const scoreValues = [96, 98, 100, 99, 97, 96];
    let tick = 0;

    const interval = setInterval(() => {
      tick += 1;
      setLiveScore(scoreValues[tick % scoreValues.length]);

      if (tick >= scoreValues.length * 2) {
        clearInterval(interval);
      }
    }, 220);

    setProfiles((previous) =>
      previous.map((entry) =>
        entry.name === profileName
          ? { ...entry, fps: Math.min(entry.fps + 6, 300), focus: Math.min(entry.focus + 4, 100) }
          : entry
      )
    );
  };

  const handleToggleChange = (index) => {
    setToggles((previous) =>
      previous.map((toggle, toggleIndex) =>
        toggleIndex === index ? { ...toggle, enabled: !toggle.enabled } : toggle
      )
    );
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (!customProfile.trim()) {
      return;
    }

    const nextName = customProfile.trim();
    const exists = profiles.some((entry) => entry.name === nextName);

    if (!exists) {
      const newProfile = {
        name: nextName,
        latency: 16,
        packetLoss: 0.2,
        fps: 180,
        focus: 88,
      };

      setProfiles((previous) => [...previous, newProfile]);
      setProfileName(nextName);
    } else {
      setProfileName(nextName);
    }

    setCustomProfile('');
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const name = loginValue.trim() || 'Gamer';
    setUser(name);
    setShowLogin(false);
  };

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
          <p className="card-label">Current profile</p>
          <h3>{profileName}</h3>
          <div className="mini-stats">
            <span>Latency: {currentProfile?.latency ?? 12}ms</span>
            <span>Packet loss: {currentProfile?.packetLoss ?? 0.2}%</span>
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
            <button className="primary-btn" type="button" onClick={handleBoost}>
              Boost now
            </button>
            <button className="profile-pill" type="button" onClick={() => setShowLogin(true)}>
              {user}
            </button>
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
              <strong>{liveScore}</strong>
              <span>FPS health</span>
            </div>
          </div>
        </section>

        <section className="metrics-grid" aria-label="Performance metrics">
          {baseMetrics.map((item) => (
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
              {starterGames.map((game) => (
                <article
                  key={game.name}
                  className={`game-item ${selectedGame === game.name ? 'active-game' : ''}`}
                  onClick={() => setSelectedGame(game.name)}
                >
                  <div className="game-info">
                    <div className={`game-icon ${game.accent}`}>{game.name.charAt(0)}</div>
                    <div>
                      <h4>{game.name}</h4>
                      <p>{game.mode}</p>
                    </div>
                  </div>
                  <span className={`status ${game.status === 'Boosted' ? 'strong' : 'online'}`}>
                    {game.status}
                  </span>
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
              {toggles.map((toggle, index) => (
                <label key={toggle.name} className="toggle-row">
                  <span>{toggle.name}</span>
                  <input
                    type="checkbox"
                    checked={toggle.enabled}
                    onChange={() => handleToggleChange(index)}
                  />
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
                <div className="bar-track"><span style={{ width: `${currentProfile?.focus ?? 92}%` }} /></div>
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

        <section className="profiles-panel panel">
          <div className="panel-header">
            <h3>Saved profiles</h3>
            <button className="chip-btn" type="button">Add profile</button>
          </div>

          <div className="profile-grid">
            {profiles.map((profile) => (
              <button
                key={profile.name}
                type="button"
                className={`profile-card ${profile.name === profileName ? 'selected' : ''}`}
                onClick={() => setProfileName(profile.name)}
              >
                <span className="profile-name">{profile.name}</span>
                <span className="profile-stat">{profile.fps} FPS</span>
                <small>{profile.latency}ms ping</small>
              </button>
            ))}
          </div>

          <form className="profile-form" onSubmit={handleSaveProfile}>
            <input
              type="text"
              value={customProfile}
              onChange={(event) => setCustomProfile(event.target.value)}
              placeholder="Create custom profile"
            />
            <button className="primary-btn" type="submit">Save</button>
          </form>
        </section>
      </main>

      {showLogin && (
        <div className="modal-backdrop" onClick={() => setShowLogin(false)}>
          <div className="login-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h3>Player profile</h3>
              <button type="button" className="close-btn" onClick={() => setShowLogin(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <label htmlFor="player-name">Display name</label>
              <input
                id="player-name"
                type="text"
                value={loginValue}
                onChange={(event) => setLoginValue(event.target.value)}
              />
              <button className="primary-btn" type="submit">Save profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
