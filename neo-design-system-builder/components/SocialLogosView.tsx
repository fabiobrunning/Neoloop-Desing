import React, { useState } from 'react';
import { Copy, Check, Download } from 'lucide-react';
import socialCatalog from '../src/data/social-logos.json';

type Variant = 'color' | 'white' | 'black';

interface SocialLogo {
  id: string;
  name: string;
  filename: string;
  path: string;
  url: string;
  extension: string;
  platform: string;
  variant: Variant;
}

const SocialLogosView: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<Variant>('color');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedLogo, setSelectedLogo] = useState<SocialLogo | null>(null);

  const logos = (socialCatalog.variants[activeVariant].logos as SocialLogo[]) || [];
  const totalLogos = socialCatalog.total;

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadLogo = (logo: SocialLogo) => {
    const a = document.createElement('a');
    a.href = logo.url;
    a.download = logo.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Brand colors para todas as 28 plataformas
  const platformColors: Record<string, string> = {
    discord: '#5865F2',
    facebook: '#1877F2',
    github: '#181717',
    google: '#EA4335',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    messenger: '#0084FF',
    midjourney: '#000000',
    openai: '#10A37F',
    pinterest: '#E60023',
    reddit: '#FF4500',
    skype: '#00AFF0',
    snapchat: '#FFFC00',
    soundcloud: '#FF3300',
    spotify: '#1DB954',
    steam: '#171A21',
    teamviewer: '#0E8EE9',
    telegram: '#26A5E4',
    threads: '#000000',
    tiktok: '#000000',
    tinder: '#FE3C72',
    trello: '#0052CC',
    tumblr: '#35465C',
    twitch: '#9146FF',
    vine: '#00BF8F',
    whatsapp: '#25D366',
    x: '#000000',
    youtube: '#FF0000',
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Social Media Logos</h2>
            <p className="text-purple-100">
              {totalLogos} logos oficiais em 3 variantes de cor
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{totalLogos}</div>
            <div className="text-sm text-purple-200">Total de Logos</div>
          </div>
        </div>
      </div>

      {/* Variant Selector Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 inline-flex gap-2 w-fit">
        <button
          onClick={() => setActiveVariant('color')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeVariant === 'color'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Colorida ({socialCatalog.variants.color.total})
        </button>
        <button
          onClick={() => setActiveVariant('white')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeVariant === 'white'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          White ({socialCatalog.variants.white.total})
        </button>
        <button
          onClick={() => setActiveVariant('black')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${
            activeVariant === 'black'
              ? 'bg-slate-900 text-white shadow-lg'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Black ({socialCatalog.variants.black.total})
        </button>
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo) => (
          <div
            key={logo.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-purple-300 transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedLogo(logo)}
          >
            <div
              className={`h-32 flex items-center justify-center p-6 transition-colors duration-300 ${
                activeVariant === 'white' ? 'bg-slate-900' : 'bg-slate-50'
              }`}
              style={{
                backgroundColor:
                  activeVariant === 'color'
                    ? `${platformColors[logo.platform] || '#94a3b8'}15`
                    : activeVariant === 'white'
                    ? '#1e293b'
                    : '#f8fafc',
              }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-slate-900 truncate mb-2">
                {logo.name}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(logo.url, logo.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  {copiedId === logo.id ? (
                    <>
                      <Check size={12} /> OK
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadLogo(logo);
                  }}
                  className="px-2 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Examples */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Exemplos de Uso</h3>

        <div className="space-y-6">
          {/* Footer Social Links */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">Footer com Links Sociais</h4>
            <div className="bg-slate-900 p-8 rounded-2xl">
              <div className="flex items-center justify-center gap-6">
                {logos.slice(0, 6).map((logo) => (
                  <a
                    key={logo.id}
                    href="#"
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <img
                      src={logo.url}
                      alt={logo.name}
                      className="w-6 h-6 object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Social Share Buttons Grid */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">Botões de Compartilhamento</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {logos.slice(0, 6).map((logo) => (
                <button
                  key={logo.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold hover:opacity-90 transition-opacity text-sm"
                  style={{
                    backgroundColor: platformColors[logo.platform] || '#64748b',
                  }}
                >
                  <img
                    src={activeVariant === 'color' ? logos.find(l => l.platform === logo.platform && l.variant === 'white')?.url || logo.url : logo.url}
                    alt={logo.name}
                    className="w-4 h-4 object-contain brightness-0 invert"
                  />
                  {logo.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Como Usar no Código</h3>
        <pre className="text-blue-400 text-sm font-mono leading-relaxed overflow-x-auto">
{`import socialLogos from '@/data/social-logos.json';

// Obter logo específico em uma variante
const githubWhite = socialLogos.variants.white.logos
  .find(l => l.platform === 'github');

// Obter logo colorido
const instagramColor = socialLogos.variants.color.logos
  .find(l => l.platform === 'instagram');

// Usar no JSX
<img src={githubWhite.url} alt={githubWhite.name} />

// Total de logos: ${totalLogos}
// Variantes disponíveis: color (${socialCatalog.variants.color.total}), white (${socialCatalog.variants.white.total}), black (${socialCatalog.variants.black.total})
// Plataformas: ${Array.from(new Set(logos.map(l => l.platform))).join(', ')}`}
        </pre>
      </div>

      {/* Modal de Detalhes */}
      {selectedLogo && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedLogo(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-64 flex items-center justify-center p-12"
              style={{
                backgroundColor:
                  activeVariant === 'color'
                    ? `${platformColors[selectedLogo.platform] || '#94a3b8'}20`
                    : activeVariant === 'white'
                    ? '#1e293b'
                    : '#f8fafc',
              }}
            >
              <img
                src={selectedLogo.url}
                alt={selectedLogo.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                {selectedLogo.name}
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Platform</p>
                  <p className="text-lg font-bold text-slate-900 capitalize">
                    {selectedLogo.platform}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Variante</p>
                  <p className="text-lg font-bold text-slate-900 capitalize">
                    {selectedLogo.variant}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Format</p>
                  <p className="text-lg font-bold text-slate-900 uppercase">
                    {selectedLogo.extension}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(selectedLogo.url, selectedLogo.id)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedId === selectedLogo.id ? (
                    <>
                      <Check size={20} /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={20} /> Copy URL
                    </>
                  )}
                </button>
                <button
                  onClick={() => downloadLogo(selectedLogo)}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download
                </button>
                <button
                  onClick={() => setSelectedLogo(null)}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLogosView;
