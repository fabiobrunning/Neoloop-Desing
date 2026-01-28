import React, { useState } from 'react';
import { Copy, Check, Download, CreditCard } from 'lucide-react';
import paymentCatalog from '../src/data/payment-methods.json';

interface PaymentMethod {
  id: string;
  name: string;
  filename: string;
  path: string;
  url: string;
  extension: string;
  method: string;
}

const PaymentMethodsView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const methods = paymentCatalog.logos as PaymentMethod[];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadMethod = (method: PaymentMethod) => {
    const a = document.createElement('a');
    a.href = method.url;
    a.download = method.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black mb-2">Payment Methods</h2>
            <p className="text-green-100">
              {paymentCatalog.total} métodos de pagamento oficiais
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-black">{paymentCatalog.total}</div>
            <div className="text-sm text-green-200">Logos Disponíveis</div>
          </div>
        </div>
      </div>

      {/* Methods Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedMethod(method)}
          >
            <div className="h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
              <img
                src={method.url}
                alt={method.name}
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-bold text-slate-900 truncate mb-2">
                {method.name}
              </h3>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard(method.url, method.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
                >
                  {copiedId === method.id ? (
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
                    downloadMethod(method);
                  }}
                  className="px-2 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
          {/* Checkout Page Example */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">Página de Checkout</h4>
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
                <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} /> Selecione o Método de Pagamento
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  {methods.slice(0, 6).map((method) => (
                    <button
                      key={method.id}
                      className="p-3 border-2 border-slate-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all"
                    >
                      <img
                        src={method.url}
                        alt={method.name}
                        className="w-full h-8 object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Payment Icons */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">Footer - Métodos Aceitos</h4>
            <div className="bg-slate-900 p-8 rounded-2xl">
              <div className="text-center">
                <p className="text-sm text-slate-400 mb-4">Aceitamos</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  {methods.map((method) => (
                    <div
                      key={method.id}
                      className="bg-white px-4 py-2 rounded-lg"
                    >
                      <img
                        src={method.url}
                        alt={method.name}
                        className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Cards Row */}
          <div>
            <h4 className="font-bold text-slate-700 mb-3">Cards Aceitos</h4>
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-600">Pagamento seguro com:</span>
                <div className="flex items-center gap-2">
                  {methods.slice(0, 4).map((method) => (
                    <img
                      key={method.id}
                      src={method.url}
                      alt={method.name}
                      className="h-6 object-contain"
                    />
                  ))}
                  {methods.length > 4 && (
                    <span className="text-sm text-slate-400 font-medium">
                      +{methods.length - 4} mais
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Reference */}
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-6">Como Usar no Código</h3>
        <pre className="text-green-400 text-sm font-mono leading-relaxed overflow-x-auto">
{`import paymentMethods from '@/data/payment-methods.json';

// Obter método específico
const visa = paymentMethods.logos.find(m => m.method === 'visa');
const mastercard = paymentMethods.logos.find(m => m.method === 'mastercard');

// Usar no JSX
<img src={visa.url} alt={visa.name} />

// Exibir todos
{paymentMethods.logos.map(method => (
  <img key={method.id} src={method.url} alt={method.name} />
))}

// Métodos disponíveis: ${methods.map(m => m.method).join(', ')}`}
        </pre>
      </div>

      {/* Modal de Detalhes */}
      {selectedMethod && (
        <div
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedMethod(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-12">
              <img
                src={selectedMethod.url}
                alt={selectedMethod.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }}
              />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                {selectedMethod.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Método</p>
                  <p className="text-lg font-bold text-slate-900 capitalize">
                    {selectedMethod.method}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Format</p>
                  <p className="text-lg font-bold text-slate-900 uppercase">
                    {selectedMethod.extension}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => copyToClipboard(selectedMethod.url, selectedMethod.id)}
                  className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  {copiedId === selectedMethod.id ? (
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
                  onClick={() => downloadMethod(selectedMethod)}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download size={20} /> Download
                </button>
                <button
                  onClick={() => setSelectedMethod(null)}
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

export default PaymentMethodsView;
