import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { useBlogPosts } from '../lib/useSupabaseData';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const { data: blogPosts, loading } = useBlogPosts();
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Prendre les 6 meilleurs articles (les plus récents)
  const featuredPosts = blogPosts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Ouvrir l'article
  const openArticle = (post: any) => {
    navigate(`/blog/${post.slug}`);
  };

  // Ouvrir le modal de partage
  const openShareModal = (post: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPost(post);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
    setCopiedLink(false);
    document.body.style.overflow = 'unset';
  };

  // Fonction de partage avec Open Graph
  const shareArticle = (platform: 'facebook' | 'linkedin' | 'twitter' | 'copy') => {
    if (!selectedPost) return;

    // URL complète de l'article
    const articleUrl = `${window.location.origin}/blog/${selectedPost.slug}`;
    
    // Métadonnées Open Graph
    const ogData = {
      url: articleUrl,
      title: selectedPost.title,
      description: selectedPost.excerpt || selectedPost.short_description,
      image: selectedPost.cover_image || selectedPost.image,
      siteName: 'Leonce Ouattara Studio',
      siteUrl: window.location.origin,
    };

    switch (platform) {
      case 'facebook':
        // Facebook Open Graph Debugger pour vérifier : https://developers.facebook.com/tools/debug/
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(ogData.url)}`,
          '_blank',
          'width=600,height=400'
        );
        break;

      case 'linkedin':
        // LinkedIn partage avec URL (Open Graph automatique)
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(ogData.url)}`,
          '_blank',
          'width=600,height=400'
        );
        break;

      case 'twitter':
        // Twitter avec texte personnalisé
        const tweetText = `${ogData.title}\n\n${ogData.description}\n\nvia @LeonceOuattaraStudio`;
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(ogData.url)}`,
          '_blank',
          'width=600,height=400'
        );
        break;

      case 'copy':
        // Copier le lien avec métadonnées formatées
        const richText = `${ogData.title}\n${ogData.description}\n\n🔗 ${ogData.url}\n\n📰 ${ogData.siteName}`;
        navigator.clipboard.writeText(richText).then(() => {
          setCopiedLink(true);
          setTimeout(() => setCopiedLink(false), 2000);
        });
        break;
    }
  };

  if (loading) {
    return (
      <section id="blog" className="py-20 bg-black/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Chargement des articles...</p>
          </div>
        </div>
      </section>
    );
  }

  // Définir les articles selon la grille
  const mainArticle = featuredPosts[0]; // Article à la une (slider)
  const stackedArticles = featuredPosts.slice(1, 3); // 2 articles superposés
  const horizontalArticles = featuredPosts.slice(3, 6); // 3 articles horizontaux

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black-500/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm">Blog & Actualités</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Derniers Articles
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez nos insights sur la digitalisation du secteur financier, 
            les tendances tech et les meilleures pratiques.
          </p>
        </div>

        {/* Grid Layout Ultra-Moderne */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* COLONNE 1 : Article à la Une (Slider) */}
          <div className="lg:col-span-2">
            {mainArticle && (
              <div
                onClick={() => openArticle(mainArticle)}
                className="group relative h-full min-h-[600px] rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* Image de fond */}
                <div className="absolute inset-0">
                  <img
                    src={mainArticle.cover_image || mainArticle.image}
                    alt={mainArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Badge "À la une" */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold rounded-full shadow-lg">
                    ⭐ À la une
                  </span>
                </div>

                {/* Bouton Share */}
                <button
                  onClick={(e) => openShareModal(mainArticle, e)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group/share"
                >
                  <Share2 size={18} className="text-white group-hover/share:scale-110 transition-transform" />
                </button>

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  {/* Catégorie */}
                  <span className="inline-block px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full mb-4">
                    {mainArticle.category}
                  </span>

                  {/* Titre */}
                  <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {mainArticle.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-300 mb-6 line-clamp-2">
                    {mainArticle.excerpt || mainArticle.short_description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(mainArticle.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{mainArticle.read_time || '5 min'}</span>
                    </div>
                    
                  </div>

                  {/* Arrow CTA */}
                  <div className="mt-6 flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-4 transition-all">
                    <span>Lire l'article</span>
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* COLONNE 2 : 2 Articles Superposés */}
          <div className="flex flex-col gap-6">
            {stackedArticles.map((post, index) => (
              <div
                key={post.id}
                onClick={() => openArticle(post)}
                className="group relative h-[292px] rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={post.cover_image || post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Bouton Share */}
                <button
                  onClick={(e) => openShareModal(post, e)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Share2 size={16} className="text-white" />
                </button>

                {/* Contenu */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <span className="inline-block px-2 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-purple-400 text-xs font-semibold rounded-full mb-3">
                    {post.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.read_time || '5 min'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2 : 3 Articles Horizontaux */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {horizontalArticles.map((post) => (
            <div
              key={post.id}
              onClick={() => openArticle(post)}
              className="group bg-white/5 border border-gray-800/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.cover_image || post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Bouton Share */}
                <button
                  onClick={(e) => openShareModal(post, e)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Share2 size={14} className="text-white" />
                </button>

                {/* Catégorie */}
                <span className="absolute bottom-3 left-3 px-2 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt || post.short_description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{post.read_time || '5 min'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton Voir Tous les Articles */}
        <div className="text-center">
          <button
            onClick={() => navigate('/blog-tech')}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            <span>Voir tous les articles</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal de Partage Amélioré */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800/50 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
            {/* Header avec Image */}
            <div className="relative h-64">
              <img
                src={selectedPost.cover_image || selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Bouton Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <X size={20} className="text-white" />
              </button>

              {/* Logo LOS */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LOS</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Leonce Ouattara Studio</p>
                  <p className="text-gray-400 text-xs">Partager cet article</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              {/* Titre */}
              <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
                {selectedPost.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-400 mb-6 line-clamp-3">
                {selectedPost.excerpt || selectedPost.short_description}
              </p>

              {/* Options de Partage */}
              <div className="space-y-3">
                <p className="text-sm text-gray-500 font-semibold mb-4">Partager sur :</p>

                {/* Facebook */}
                <button
                  onClick={() => shareArticle('facebook')}
                  className="w-full flex items-center gap-4 p-4 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Facebook size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold">Facebook</p>
                    <p className="text-gray-400 text-sm">Partager avec image et description</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => shareArticle('linkedin')}
                  className="w-full flex items-center gap-4 p-4 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#0A66C2] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Linkedin size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold">LinkedIn</p>
                    <p className="text-gray-400 text-sm">Partager professionnellement</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>

                {/* Twitter */}
                <button
                  onClick={() => shareArticle('twitter')}
                  className="w-full flex items-center gap-4 p-4 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/30 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#1DA1F2] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Twitter size={24} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold">Twitter / X</p>
                    <p className="text-gray-400 text-sm">Tweeter l'article</p>
                  </div>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>

                {/* Copier le Lien */}
                <button
                  onClick={() => shareArticle('copy')}
                  className="w-full flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    {copiedLink ? (
                      <span className="text-white font-bold text-xs">✓</span>
                    ) : (
                      <Copy size={24} className="text-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-semibold">
                      {copiedLink ? 'Lien copié !' : 'Copier le lien'}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {copiedLink ? 'Avec titre et description' : 'Format texte enrichi'}
                    </p>
                  </div>
                  {copiedLink ? (
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  ) : (
                    <LinkIcon size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Info URL */}
              <div className="mt-6 p-4 bg-black/30 border border-gray-800/50 rounded-xl">
                <p className="text-xs text-gray-500 mb-2">URL de l'article :</p>
                <p className="text-sm text-cyan-400 truncate font-mono">
                  {window.location.origin}/blog/{selectedPost.slug}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
