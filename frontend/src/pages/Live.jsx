import { Video, Users, Heart, MessageCircle, Share2 } from 'lucide-react';
import './Live.css';

export default function Live() {
    return (
        <div className="live-page animate-fadeIn">
            <div className="live-container">
                <div className="live-main">
                    <div className="video-player-wrapper">
                        <div className="live-overlay">
                            <span className="live-badge-large">LIVE</span>
                            <span className="viewer-count">
                                <Users size={16} /> 12.5k watching
                            </span>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1627916607164-7b6422a57321?w=1200&q=80"
                            alt="Live Stream"
                            className="video-placeholder"
                        />
                        <div className="play-btn-overlay">
                            <Video size={64} fill="currentColor" />
                        </div>
                    </div>

                    <div className="stream-info">
                        <div className="streamer-profile">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Streamer" className="streamer-avatar" />
                            <div>
                                <h1 className="stream-title">Summer Collection Launch Party! 🌴</h1>
                                <p className="streamer-name">@fashion_daily_official</p>
                            </div>
                        </div>

                        <div className="stream-actions">
                            <button className="btn btn-secondary btn-icon-text"><Heart size={20} /> Follow</button>
                            <button className="btn btn-secondary btn-icon-text"><Share2 size={20} /> Share</button>
                        </div>
                    </div>
                </div>

                <div className="live-chat">
                    <div className="chat-header">Live Chat</div>
                    <div className="chat-messages">
                        <div className="chat-msg">
                            <span className="user">@user123:</span> So excited for this drop!
                        </div>
                        <div className="chat-msg">
                            <span className="user">@style_guru:</span> That jacket is fire 🔥
                        </div>
                        <div className="chat-msg">
                            <span className="user">@newbie:</span> When does it start?
                        </div>
                        <div className="chat-msg">
                            <span className="user">@admin:</span> Links dropping in 5 mins!
                        </div>
                    </div>
                    <div className="chat-input-wrapper">
                        <input type="text" placeholder="Say something..." className="chat-input" />
                        <button className="chat-send"><MessageCircle size={20} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
