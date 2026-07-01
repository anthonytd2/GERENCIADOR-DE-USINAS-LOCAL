import { AlertTriangle, X } from "lucide-react";

interface ModalConfirmacaoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isDestructive?: boolean;
}

export default function ModalConfirmacao({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  isDestructive = false,
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 animate-scale-up relative">
        
        {/* Botão de Fechar Superior */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho de Alerta Dinâmico */}
        <div className={`flex items-center gap-3 p-3 rounded-2xl border ${
          isDestructive 
            ? "text-rose-600 bg-rose-50 border-rose-100" 
            : "text-amber-600 bg-amber-50 border-amber-100"
        }`}>
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <h4 className={`font-black text-base ${isDestructive ? "text-rose-950" : "text-amber-950"}`}>
            {title}
          </h4>
        </div>
        
        {/* Texto descritivo */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-slate-800 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Ações / Botões */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-200/60 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-3 text-white font-bold text-xs rounded-xl shadow-lg transition-colors ${
              isDestructive 
                ? "bg-rose-600 hover:bg-rose-500 shadow-rose-600/10" 
                : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}