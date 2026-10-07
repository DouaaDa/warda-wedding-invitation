import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { wedding as fallbackWedding } from '../config';

export default function Dashboard() {
  const [settings, setSettings] = useState({ ...fallbackWedding });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('wedding_settings').select('*').single();
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSaving(true);
      setMessage("Téléchargement de l'image...");
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${field}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('couple-photos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('couple-photos').getPublicUrl(filePath);
      
      setSettings(prev => ({ ...prev, [field]: data.publicUrl }));
      setMessage("Image téléchargée avec succès. N'oubliez pas d'enregistrer.");
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage("Erreur lors du téléchargement.");
    } finally {
      setSaving(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setSaving(true);
      setMessage("Téléchargement de la galerie...");
      
      const newPhotos = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `gallery-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('wedding-gallery')
          .upload(fileName, file);

        if (!uploadError) {
          const { data } = supabase.storage.from('wedding-gallery').getPublicUrl(fileName);
          newPhotos.push({ id: fileName, url: data.publicUrl });
        }
      }
      
      setSettings(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...newPhotos] }));
      setMessage("Galerie mise à jour. N'oubliez pas d'enregistrer.");
    } catch (error) {
      console.error('Error uploading gallery:', error);
      setMessage("Erreur galerie.");
    } finally {
      setSaving(false);
    }
  };

  const removeGalleryPhoto = (id) => {
    setSettings(prev => ({
      ...prev,
      gallery: prev.gallery.filter(p => p.id !== id)
    }));
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("Enregistrement...");

    try {
      const { error } = await supabase
        .from('wedding_settings')
        .upsert({ id: 1, ...settings });

      if (error) throw error;
      setMessage("Paramètres enregistrés avec succès !");
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) return <div>Chargement du tableau de bord...</div>;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {message && (
        <div className="fixed top-24 right-8 bg-primary text-gold px-6 py-3 rounded-sm shadow-xl z-50 animate-bounce">
          {message}
        </div>
      )}

      <form onSubmit={saveSettings} className="space-y-12">
        
        {/* Section 1: Couple Photos */}
        <div className="bg-white p-8 border border-gold/20 shadow-sm">
          <h2 className="font-serif text-2xl text-primary mb-6">1. Photos du Couple</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Photo Principale (Grande)</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'couplePhoto2')} className="mb-4 text-sm" />
              {settings.couplePhoto2 && (
                <img src={settings.couplePhoto2} alt="Preview" className="w-full h-64 object-cover border border-gold/30" />
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Photo Secondaire (Petite superposée)</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'couplePhoto1')} className="mb-4 text-sm" />
              {settings.couplePhoto1 && (
                <img src={settings.couplePhoto1} alt="Preview" className="w-full h-64 object-cover border border-gold/30" />
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Informations du Mariage */}
        <div className="bg-white p-8 border border-gold/20 shadow-sm">
          <h2 className="font-serif text-2xl text-primary mb-6">2. Informations du Mariage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Prénom du Marié" name="groom" value={settings.groom} onChange={handleTextChange} />
            <InputField label="Prénom de la Mariée" name="bride" value={settings.bride} onChange={handleTextChange} />
            <InputField label="Année" name="year" value={settings.year} onChange={handleTextChange} />
            <InputField label="Date ISO (ex: 2027-01-28)" name="date" value={settings.date} onChange={handleTextChange} placeholder="2027-01-28" />
            <InputField label="Date affichée (ex: 28 January 2027)" name="dateDisplay" value={settings.dateDisplay} onChange={handleTextChange} placeholder="28 January 2027" />
            <InputField label="Heure (ex: 19:00)" name="time" value={settings.time} onChange={handleTextChange} placeholder="19:00" />
            <InputField label="Heure affichée (ex: 19H00)" name="timeDisplay" value={settings.timeDisplay} onChange={handleTextChange} placeholder="19H00" />
            <InputField label="Lieu / Salle" name="venue" value={settings.venue} onChange={handleTextChange} />
            <InputField label="Ville" name="city" value={settings.city} onChange={handleTextChange} />
            <InputField label="Adresse complète" name="address" value={settings.address} onChange={handleTextChange} />
            <InputField label="Lien Google Maps" name="mapsUrl" value={settings.mapsUrl} onChange={handleTextChange} />
          </div>
        </div>

        {/* Section 3: Textes et Invitation */}
        <div className="bg-white p-8 border border-gold/20 shadow-sm">
          <h2 className="font-serif text-2xl text-primary mb-6">3. Textes & Options</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Texte d'invitation (Français)</label>
              <textarea 
                name="invitationText" 
                value={settings.invitationText} 
                onChange={handleTextChange} 
                className="w-full px-4 py-3 border border-secondary/20 bg-pearl/30 h-32"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Texte d'invitation (Arabe)</label>
              <textarea 
                name="arabicText" 
                value={settings.arabicText} 
                onChange={handleTextChange} 
                dir="rtl"
                className="w-full px-4 py-3 border border-secondary/20 bg-pearl/30 h-32 font-arabic text-xl"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">Message Sans Enfants</label>
              <textarea 
                name="noChildrenMessage" 
                value={settings.noChildrenMessage} 
                onChange={handleTextChange} 
                className="w-full px-4 py-3 border border-secondary/20 bg-pearl/30 h-24"
              />
            </div>
            <InputField label="Musique (chemin local ex: /music/wedding-song.mp3)" name="musicUrl" value={settings.musicUrl} onChange={handleTextChange} />
          </div>
        </div>

        {/* Section 4: Galerie */}
        <div className="bg-white p-8 border border-gold/20 shadow-sm">
          <h2 className="font-serif text-2xl text-primary mb-6">4. Galerie Photos</h2>
          <input type="file" multiple accept="image/*" onChange={handleGalleryUpload} className="mb-6" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {settings.gallery?.map((photo) => (
              <div key={photo.id} className="relative group border border-gold/30">
                <img src={photo.url} alt="Gallery" className="w-full aspect-square object-cover" />
                <button 
                  type="button" 
                  onClick={() => removeGalleryPhoto(photo.id)}
                  className="absolute top-2 right-2 bg-primary text-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm border-t border-gold/20 flex justify-center z-40">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-gold px-12 py-4 uppercase tracking-[0.2em] text-sm hover:bg-tertiary transition-colors disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Sauvegarder les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-secondary/70 mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-secondary/20 rounded-sm focus:outline-none focus:border-gold focus:border-1 bg-pearl/30"
      />
    </div>
  );
}
