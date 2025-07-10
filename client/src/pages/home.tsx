import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Quote } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Sun, Quote as QuoteIcon, RotateCw, Share2, Lightbulb, Film, Star, Heart, Rocket, Calendar, Settings, Bookmark, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { name: "Philosophy", icon: Lightbulb },
  { name: "Movies", icon: Film },
  { name: "Famous People", icon: Star },
  { name: "Inspiration", icon: Heart },
  { name: "Success", icon: Rocket },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch random quote on initial load
  const { data: currentQuote, isLoading } = useQuery<Quote>({
    queryKey: ["/api/quotes/random"],
    enabled: !selectedCategory,
  });

  // Fetch quotes by category
  const { data: categoryQuotes } = useQuery<Quote[]>({
    queryKey: ["/api/quotes/category", selectedCategory],
    enabled: !!selectedCategory,
  });

  // Fetch all quotes for total count
  const { data: allQuotes } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
  });

  // Get random quote mutation
  const getRandomQuoteMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("GET", "/api/quotes/random");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes/random"] });
      toast({
        title: "New quote loaded!",
        description: "Here's your fresh dose of inspiration.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to load a new quote. Please try again.",
        variant: "destructive",
      });
    },
  });

  const displayQuote = selectedCategory && categoryQuotes && categoryQuotes.length > 0
    ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
    : currentQuote;

  const handleGetNewQuote = () => {
    if (selectedCategory) {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes/category", selectedCategory] });
      toast({
        title: "New quote from " + selectedCategory,
        description: "Here's another inspiring quote from this category.",
      });
    } else {
      getRandomQuoteMutation.mutate();
    }
  };

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      toast({
        title: "Category selected",
        description: `Showing quotes from ${category}`,
      });
    }
  };

  const handleShare = async () => {
    if (!displayQuote) return;

    const shareText = `"${displayQuote.text}" — ${displayQuote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Daily Dose of Life",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "Quote copied!",
          description: "The quote has been copied to your clipboard.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to copy quote to clipboard.",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoading && !selectedCategory) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading your daily dose...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="floating-element w-32 h-32 bg-white top-10 left-10 animate-float" style={{ animationDelay: "0s" }}></div>
      <div className="floating-element w-20 h-20 top-1/4 right-16 animate-float" style={{ animationDelay: "2s", backgroundColor: "var(--bright-yellow)" }}></div>
      <div className="floating-element w-24 h-24 bottom-20 left-1/4 animate-float" style={{ animationDelay: "4s", backgroundColor: "var(--coral)" }}></div>
      <div className="floating-element w-16 h-16 top-3/4 right-1/3 animate-float" style={{ animationDelay: "1s", backgroundColor: "var(--vibrant-purple)" }}></div>
      <div className="floating-element w-28 h-28 bottom-32 right-20 animate-float" style={{ animationDelay: "3s", backgroundColor: "var(--turquoise)" }}></div>

      {/* Header */}
      <header className="text-center pt-8 pb-4 relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            <Sun className="inline-block mr-3 text-yellow-300" size={48} />
            Daily Dose of Life
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light">
            Your daily inspiration awaits
          </p>
        </div>
      </header>

      {/* Main Quote Display */}
      <main className="flex items-center justify-center min-h-[70vh] px-4 relative z-10">
        <div className="quote-container rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl animate-scale-in">
          {/* Quote Icon */}
          <div className="text-center mb-6">
            <QuoteIcon className="mx-auto text-yellow-300 opacity-80" size={48} />
          </div>

          {/* Quote Text */}
          {displayQuote ? (
            <div className="text-center mb-8">
              <blockquote className="quote-text text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-6">
                "{displayQuote.text}"
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white/90">
                <cite className="text-lg md:text-xl font-semibold">
                  — {displayQuote.author}
                </cite>
                <span className="hidden md:block text-white/60">•</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                  {displayQuote.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8">
              <div className="text-white/70 text-xl">No quotes available</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetNewQuote}
              disabled={getRandomQuoteMutation.isPending}
              className="btn-energetic text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCw className={`mr-2 ${getRandomQuoteMutation.isPending ? 'animate-spin' : ''}`} size={20} />
              Get Another Quote
            </Button>

            <Button
              onClick={handleShare}
              variant="ghost"
              className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              <Share2 className="mr-2" size={20} />
              Share Quote
            </Button>
          </div>

          {/* Quote Counter */}
          {allQuotes && (
            <div className="text-center mt-6">
              <p className="text-white/70 text-sm">
                Quote collection: <span className="font-semibold">{allQuotes.length}+</span> inspiring quotes
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Category Filter */}
      <section className="relative z-10 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-white text-xl font-semibold mb-6">Explore by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.name}
                onClick={() => handleCategoryFilter(category.name)}
                variant="ghost"
                className={`px-4 py-2 text-white rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:scale-105 ${
                  selectedCategory === category.name
                    ? 'bg-white/30 shadow-lg'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <category.icon className="mr-1" size={16} />
                {category.name}
              </Button>
            ))}
          </div>
          {selectedCategory && (
            <div className="text-center mt-4">
              <Button
                onClick={() => setSelectedCategory(null)}
                variant="ghost"
                className="text-white/80 hover:text-white text-sm"
              >
                Clear filter
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/80">
                <p className="text-sm">
                  <Calendar className="inline mr-2" size={16} />
                  Fresh quotes updated regularly
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  title="Settings"
                >
                  <Settings size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  title="Favorites"
                >
                  <Bookmark size={18} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                  title="About"
                >
                  <Info size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
