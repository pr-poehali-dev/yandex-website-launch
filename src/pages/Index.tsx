import { useEffect, useRef } from "react";

const Index = () => {
  const playerCountRef = useRef<HTMLSpanElement>(null);

  const copyIP = () => {
    const ip = "45.93.200.34:25580";
    navigator.clipboard.writeText(ip).then(() => {
      const btn = document.querySelector(".copy-btn") as HTMLButtonElement;
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = "✅ СКОПИРОВАНО!";
      btn.style.background = "#4CAF50";
      btn.style.color = "white";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "white";
        btn.style.color = "#4a00e0";
      }, 2000);
    }).catch(() => {
      alert("IP-адрес: " + ip);
    });
  };

  useEffect(() => {
    const el = playerCountRef.current;
    if (!el) return;
    const start = 2800, end = 2847, duration = 2000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { current = end; clearInterval(timer); }
      el.textContent = Math.floor(current).toLocaleString() + " игроков";
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .mc-body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .mc-container { max-width: 1400px; width: 100%; margin: 0 auto; }
        .mc-card {
          background: rgba(255,255,255,0.97);
          border-radius: 30px;
          padding: 60px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
          backdrop-filter: blur(10px);
          transform: translateY(0);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .mc-card:hover { transform: translateY(-10px); box-shadow: 0 40px 100px rgba(0,0,0,0.5); }
        .mc-h1 {
          font-size: 3.5em;
          margin-bottom: 30px;
          text-align: center;
          background: linear-gradient(135deg, #4a00e0, #8e2de2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
          font-weight: 800;
        }
        .badge-container { display: flex; justify-content: center; gap: 25px; margin-bottom: 50px; flex-wrap: wrap; }
        .badge {
          background: linear-gradient(135deg, #4a00e0, #8e2de2);
          color: white;
          padding: 12px 30px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1em;
          box-shadow: 0 8px 25px rgba(74,0,224,0.4);
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .badge:hover { transform: scale(1.05); box-shadow: 0 12px 30px rgba(74,0,224,0.6); }
        .description { text-align: center; margin-bottom: 60px; max-width: 1000px; margin-left: auto; margin-right: auto; }
        .description p { font-size: 1.4em; color: #444; line-height: 1.8; margin-bottom: 20px; }
        .highlight {
          background: linear-gradient(135deg, #4a00e0, #8e2de2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 1.1em;
        }
        .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 35px; margin-bottom: 60px; }
        .feature-item {
          text-align: center;
          padding: 35px 25px;
          background: #f8f9fa;
          border-radius: 25px;
          transition: all 0.4s ease;
          border: 2px solid transparent;
        }
        .feature-item:hover {
          background: white;
          box-shadow: 0 20px 50px rgba(74,0,224,0.15);
          border-color: #4a00e0;
          transform: translateY(-5px);
        }
        .feature-icon { font-size: 3.5em; margin-bottom: 25px; }
        .feature-item h3 { color: #333; margin-bottom: 15px; font-size: 1.8em; font-weight: 700; }
        .feature-item p { color: #666; font-size: 1.2em; line-height: 1.6; }
        .ip-section {
          background: linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%);
          padding: 45px;
          border-radius: 25px;
          text-align: center;
          margin-top: 30px;
          box-shadow: 0 20px 40px rgba(74,0,224,0.3);
        }
        .ip-label { color: rgba(255,255,255,0.95); font-size: 1.3em; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 3px; font-weight: 600; }
        .ip-address {
          font-size: 4em; font-weight: 800; color: white;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          margin-bottom: 25px;
          font-family: 'Courier New', monospace;
          word-break: break-all; letter-spacing: 2px;
          transition: transform 0.3s ease; cursor: default;
        }
        .ip-address:hover { transform: scale(1.02); }
        .copy-btn {
          background: white; color: #4a00e0; border: none;
          padding: 18px 45px; border-radius: 60px; font-size: 1.3em;
          font-weight: 700; cursor: pointer; transition: all 0.4s ease;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3); border: 2px solid transparent;
        }
        .copy-btn:hover { transform: scale(1.08); box-shadow: 0 15px 35px rgba(0,0,0,0.4); background: #f0f0f0; border-color: white; }
        .copy-btn:active { transform: scale(0.95); }
        .player-count {
          display: inline-block; margin-top: 25px;
          color: rgba(255,255,255,0.95); font-size: 1.2em;
          background: rgba(255,255,255,0.1); padding: 12px 30px;
          border-radius: 60px; backdrop-filter: blur(5px);
        }
        .player-count span {
          background: rgba(255,255,255,0.25); padding: 8px 20px;
          border-radius: 50px; margin-left: 15px; font-weight: 700; font-size: 1.1em;
        }
        .glow-effect {
          position: fixed; width: 100%; height: 100%; pointer-events: none;
          background: radial-gradient(circle at 50% 50%, rgba(74,0,224,0.1) 0%, transparent 50%);
          z-index: -1;
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .mc-card > * { animation: fadeInUp 0.8s ease forwards; }
        .feature-item:nth-child(1) { animation-delay: 0.2s; }
        .feature-item:nth-child(2) { animation-delay: 0.4s; }
        .feature-item:nth-child(3) { animation-delay: 0.6s; }
        @media (min-width: 1920px) {
          .mc-container { max-width: 1800px; }
          .mc-h1 { font-size: 4.5em; }
          .description p { font-size: 1.6em; }
          .feature-item h3 { font-size: 2.2em; }
          .feature-item p { font-size: 1.3em; }
          .ip-address { font-size: 5em; }
        }
        @media (min-width: 1366px) and (max-width: 1919px) {
          .mc-card { padding: 50px; }
          .features { gap: 30px; }
        }
        @media (min-width: 1024px) and (max-width: 1365px) {
          .mc-card { padding: 40px; }
          .mc-h1 { font-size: 3em; }
          .description p { font-size: 1.2em; }
          .ip-address { font-size: 3.2em; }
        }
        @media (max-width: 768px) {
          .features { grid-template-columns: 1fr; }
          .mc-card { padding: 30px 20px; }
          .mc-h1 { font-size: 2em; }
          .ip-address { font-size: 2em; }
        }
      `}</style>

      <div className="mc-body">
        <div className="glow-effect" />
        <div className="mc-container">
          <div className="mc-card">
            <h1 className="mc-h1">⚡ Добро пожаловать на лучший сервер! ⚡</h1>

            <div className="badge-container">
              <span className="badge">🎮 2500+ игроков онлайн</span>
              <span className="badge">🤝 Воспитанное комьюнити</span>
              <span className="badge">⭐ Топ-1 сервер Европы</span>
              <span className="badge">🛡️ Zero Toxicity Policy</span>
              <span className="badge">🎯 24/7 Активность</span>
            </div>

            <div className="description">
              <p>🌟 <span className="highlight">Мегапопулярный сервер</span> с огромным количеством активных игроков! Каждый вечер — аншлаг, каждые выходные — рекордный онлайн!</p>
              <p>🤵 У нас играют <span className="highlight">исключительно воспитанные и культурные люди</span>. Мы создали элитное комьюнити без токсичности и с взаимоуважением!</p>
              <p>🎯 <span className="highlight">Профессиональная администрация</span> следит за порядком 24/7. Тысячи довольных игроков уже выбрали нас!</p>
            </div>

            <div className="features">
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <h3>Мега-онлайн</h3>
                <p>Постоянно 2000+ игроков. Динамичные события, массовые ивенты и всегда живое общение</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">💎</div>
                <h3>Элитное комьюнити</h3>
                <p>Только воспитанные игроки, интеллигентное общение, помощь новичкам и никакого токсикоза</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🎮</div>
                <h3>Идеальный геймплей</h3>
                <p>Сбалансированные механики, регулярные обновления и море возможностей для крутой игры</p>
              </div>
            </div>

            <div className="ip-section">
              <div className="ip-label">🚀 ПОДКЛЮЧАЙСЯ ПРЯМО СЕЙЧАС</div>
              <div className="ip-address">45.93.200.34:25580</div>
              <button className="copy-btn" onClick={copyIP}>📋 КОПИРОВАТЬ IP</button>
              <div className="player-count">
                Сейчас на сервере: <span ref={playerCountRef}>2,847 игроков</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
