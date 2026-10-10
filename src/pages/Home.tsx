import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { About } from './About';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductGrid } from '../components/ProductGrid';
import { categories } from '../data/categories';
import { productsByCategory } from '../data/products';

const seoPaths: Record<string, string> = {
  'mutfak-dolabi': '/mutfak-dolabi/',
  'gardolap': '/gardirop/',
  'banyo-dolabi': '/banyo-dolabi/',
};

const seoContents: Record<string, { heading: string; summary: string }> = {
  'mutfak-dolabi': {
    heading: 'Mutfak Dolabı Modellerimiz',
    summary: "Yalova'da özel ölçü mutfak dolabı üretimi ve montajı yapıyoruz. Modellerimizi inceleyebilir, mutfağınız için fiyat teklifi alabilirsiniz.",
  },
  gardolap: {
    heading: 'Gardırop Modellerimiz',
    summary: "Yalova'da özel ölçü gardırop üretimi yapıyoruz. Modellerimizi inceleyebilir, odanızın ölçülerine göre fiyat teklifi alabilirsiniz.",
  },
  'banyo-dolabi': {
    heading: 'Banyo Dolabı Modellerimiz',
    summary: "Yalova'da özel ölçü banyo dolabı üretimi yapıyoruz. Modellerimizi inceleyebilir, banyonuz için fiyat teklifi alabilirsiniz.",
  },
};

const categoryFromLocation = (): string | null => {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const fromPath = Object.entries(seoPaths).find(([, value]) => value.replace(/\/+$/, '') === pathname)?.[0];
  return fromPath ?? (window.location.hash.slice(1) || null);
};

interface HomeProps {
  searchQuery: string;
}

export const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(categoryFromLocation);

  // Hash tabanlı routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentCategory(categoryFromLocation());
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleCategoryClick = (slug: string) => {
    if (seoPaths[slug]) {
      window.location.assign(seoPaths[slug]);
      return;
    }
    window.location.hash = slug;
  };

  const handleBackHome = () => {
    if (Object.values(seoPaths).some((path) => path.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, ''))) {
      window.location.assign('/');
      return;
    }
    window.location.hash = '';
  };

  if (currentCategory === 'hakkimizda') {
    return <About onBack={handleBackHome} />;
  }

  const currentCategoryData = currentCategory
    ? categories.find((cat) => cat.slug === currentCategory)
    : null;

  const currentSeo = currentCategory && seoPaths[currentCategory] ? seoContents[currentCategory] : null;

  const currentProducts = currentCategory
    ? productsByCategory[currentCategory]
    : [];
  const allProducts = Object.values(productsByCategory).flat();

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = normalizedSearchQuery
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(normalizedSearchQuery)
      )
    : currentProducts;
  const filteredCategories = normalizedSearchQuery
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(normalizedSearchQuery)
      )
    : categories;

  return (
    <>
      {/* Ana Kategori Grid - Sadece hiçbir kategori seçilmediğinde göster */}
      {!currentCategory && (
        <section id="anasayfa">
          {!normalizedSearchQuery && (
            <div className="mb-9 border-b border-line pb-9 sm:mb-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold">Yalova • Marangozluk ve mobilya üretimi</p>
              <h1 className="max-w-[850px] font-[Georgia,serif] text-3xl leading-tight text-ink sm:text-4xl">Evinize ve iş yerinize özel ölçü mobilya</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">Mutfak dolabı, gardırop, banyo dolabı, ahşap masa ve diğer mobilya işlerimizden örnekleri inceleyin. İstediğiniz işi ve ölçüyü gönderin, birlikte değerlendirelim.</p>
              <a href="/teklif/" className="mt-5 inline-flex rounded bg-[#211c16] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white no-underline transition-colors hover:bg-[#514032]">FİYAT TEKLİFİ AL →</a>
            </div>
          )}
          {filteredCategories.length > 0 && (
            <CategoryGrid categories={filteredCategories} onCategoryClick={handleCategoryClick} />
          )}
          {normalizedSearchQuery && filteredProducts.length > 0 && (
            <section className="mt-12 border-t border-line pt-8" aria-labelledby="search-results-title">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Tüm kategorilerde</p>
                  <h2 id="search-results-title" className="font-[Georgia,serif] text-2xl text-ink sm:text-3xl">
                    Ürün sonuçları
                  </h2>
                </div>
                <span className="text-xs text-muted">{filteredProducts.length} sonuç</span>
              </div>
              <ProductGrid products={filteredProducts} />
            </section>
          )}
          {normalizedSearchQuery && filteredCategories.length === 0 && filteredProducts.length === 0 && (
            <p className="py-12 text-center text-sm text-muted">
              “{searchQuery}” için sonuç bulunamadı.
            </p>
          )}
        </section>
      )}

      {/* Kategori Detay Sayfaları */}
      {currentCategory && currentCategoryData && (
        <section id="category-detail" className="animate-fadeIn">
          <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-6">
            <button
              onClick={handleBackHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-wider no-underline hover:text-[#c9964a] transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Tüm Kategoriler
            </button>
            {currentSeo ? (
              <h1 className="max-w-[60%] text-right font-[Georgia,serif] text-xl font-normal leading-tight text-ink sm:max-w-none sm:text-2xl">
                {currentSeo.heading}
              </h1>
            ) : (
              <h2 className="max-w-[48%] text-right text-sm font-bold uppercase leading-tight tracking-[0.16em] text-ink sm:max-w-none sm:text-lg sm:tracking-widest">
                {currentCategoryData.name}
              </h2>
            )}
          </div>

          {currentSeo && (
            <p className="mb-6 max-w-3xl text-sm leading-7 text-muted">{currentSeo.summary}</p>
          )}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-line bg-[#f9f6f1] px-5 py-4">
            <p className="text-sm text-ink">Bu tarz bir iş mi yaptırmak istiyorsunuz? Ölçülerinizi gönderin.</p>
            <a href={`/teklif/?urun=${encodeURIComponent(currentCategory)}`} className="rounded bg-[#211c16] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white no-underline hover:bg-[#514032]">Teklif iste →</a>
          </div>
          {normalizedSearchQuery && filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : !normalizedSearchQuery ? (
            <ProductGrid products={currentProducts} />
          ) : (
            <p className="py-12 text-center text-sm text-muted">
              “{searchQuery}” için ürün bulunamadı.
            </p>
          )}
        </section>
      )}

      {/* Placeholder Sayfalar (Hakkımızda, Fiyatlar, vb.) */}
      {currentCategory && !currentCategoryData && (
        <section id="placeholder-page">
          <button
            onClick={handleBackHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gold uppercase tracking-wider no-underline mb-4 hover:text-[#c9964a] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Ana Sayfaya Dön
          </button>
          <h1 className="text-xl font-bold mb-4">
            {currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).replace('-', ' ')}
          </h1>
          <p className="text-muted">Bu sayfa yakında hazırlanacaktır.</p>
        </section>
      )}
    </>
  );
};
