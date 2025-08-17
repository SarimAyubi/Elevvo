const posts = [
      {
        id: 1,
        title: 'Building a Static Site with Vanilla JS',
        description: 'A compact guide to building and deploying a static blog without a framework.',
        date: '2025-07-01',
        category: 'Tech',
        image: 'https://picsum.photos/id/1011/800/600'
      },
      {
        id: 2,
        title: 'Backpacking the Alps',
        description: 'Route planning, essential gear, and my favorite mountain huts.',
        date: '2025-06-15',
        category: 'Travel',
        image: 'https://picsum.photos/id/1015/800/600'
      },
      {
        id: 3,
        title: 'The Best Street Foods in Bangkok',
        description: 'A tasty tour through Bangkok’s most famous street dishes.',
        date: '2025-05-20',
        category: 'Food',
        image: 'https://picsum.photos/id/1040/800/600'
      },
      {
        id: 4,
        title: 'A Minimal Approach to State Management',
        description: 'How to keep state simple and predictable in small apps.',
        date: '2025-04-03',
        category: 'Tech',
        image: 'https://picsum.photos/id/1005/800/600'
      },
      {
        id: 5,
        title: 'Exploring Kyoto’s Hidden Temples',
        description: 'Less touristy temples and serene walks in Kyoto.',
        date: '2025-03-22',
        category: 'Travel',
        image: 'https://picsum.photos/id/1025/800/600'
      },
      {
        id: 6,
        title: 'Plant-Based Breakfasts That Actually Fill You Up',
        description: 'Protein-rich breakfasts that are tasty and easy to make.',
        date: '2025-02-10',
        category: 'Food',
        image: 'https://picsum.photos/id/1080/800/600'
      },
      {
        id: 7,
        title: 'Deploying a Static Site to GitHub Pages',
        description: 'Step-by-step deploy process and gotchas.',
        date: '2025-01-05',
        category: 'Tech',
        image: 'https://picsum.photos/id/1003/800/600'
      },
      {
        id: 8,
        title: 'Weekend Roadtrip: Coastal California',
        description: 'Scenic stops, cafes worth trying, and quick hikes.',
        date: '2024-12-20',
        category: 'Travel',
        image: 'https://picsum.photos/id/1018/800/600'
      },
      {
        id: 9,
        title: 'Sourdough Basics for Beginners',
        description: 'How to make and maintain a reliable starter.',
        date: '2024-11-11',
        category: 'Food',
        image: 'https://picsum.photos/id/1084/800/600'
      },
      {
        id: 10,
        title: 'Accessibility Tips for Small Teams',
        description: 'Practical accessibility improvements you can make today.',
        date: '2024-10-02',
        category: 'Tech',
        image: 'https://picsum.photos/id/1027/800/600'
      },
      {
        id: 11,
        title: 'Island Hopping in Greece',
        description: 'Ferries, hidden coves, and where to enjoy the sunset.',
        date: '2024-09-14',
        category: 'Travel',
        image: 'https://picsum.photos/id/1020/800/600'
      },
      {
        id: 12,
        title: 'Homemade Pasta: From Dough to Plate',
        description: 'Simple pasta recipes and tips for perfect texture.',
        date: '2024-08-30',
        category: 'Food',
        image: 'https://picsum.photos/id/1062/800/600'
      }
    ];

    // State
    let currentCategory = 'All';
    let currentPage = 1;
    let pageSize = 6;
    let searchQuery = '';

    // DOM
    const categoryFiltersEl = document.getElementById('categoryFilters');
    const postsGridEl = document.getElementById('postsGrid');
    const paginationEl = document.getElementById('paginationControls');
    const searchInputEl = document.getElementById('searchInput');
    const noResultsEl = document.getElementById('noResults');
    const pageSizeSelectEl = document.getElementById('pageSizeSelect');
    const yearEl = document.getElementById('year');

    yearEl.textContent = new Date().getFullYear();

    // Utilities
    function uniqueCategories(items) {
      const set = new Set(items.map(p => p.category));
      return ['All', ...Array.from(set)];
    }

    function formatDate(dateStr) {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    }

    // Rendering
    function renderCategoryFilters() {
      const categories = uniqueCategories(posts);
      categoryFiltersEl.innerHTML = '';
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `text-sm px-3 py-1 rounded-full border transition ${
          cat === currentCategory ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-200'
        }`;
        btn.textContent = cat;
        btn.addEventListener('click', () => {
          currentCategory = cat;
          currentPage = 1;
          renderAll();
        });
        categoryFiltersEl.appendChild(btn);
      });
    }

    function filteredPosts() {
      return posts.filter(p => {
        const matchesCategory = currentCategory === 'All' ? true : p.category === currentCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.trim().toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }

    function renderPosts() {
      const items = filteredPosts();
      const total = items.length;
      const start = (currentPage - 1) * pageSize;
      const pageItems = items.slice(start, start + pageSize);

      postsGridEl.innerHTML = '';

      if (pageItems.length === 0) {
        noResultsEl.classList.remove('hidden');
      } else {
        noResultsEl.classList.add('hidden');
      }

      pageItems.forEach(p => {
        const card = document.createElement('article');
        card.className = 'bg-white rounded-lg shadow-sm overflow-hidden flex flex-col';

        card.innerHTML = `
          <img src="${p.image}" alt="${p.title}" class="w-full h-44 object-cover" loading="lazy" />
          <div class="p-4 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold">${p.title}</h3>
              <span class="text-xs px-2 py-1 rounded text-white" style="background-color:${categoryColor(p.category)}">${p.category}</span>
            </div>
            <p class="text-sm text-gray-600 mb-4 flex-1">${p.description}</p>
            <div class="text-xs text-gray-400 mt-2">${formatDate(p.date)}</div>
          </div>
        `;
        postsGridEl.appendChild(card);
      });

      renderPagination(total);
    }

    function categoryColor(cat) {
      switch (cat) {
        case 'Tech': return '#6366F1'; // indigo-500
        case 'Travel': return '#10B981'; // green-500
        case 'Food': return '#F97316'; // orange-500
        default: return '#9CA3AF';
      }
    }

    function renderPagination(totalItems) {
      const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
      paginationEl.innerHTML = '';

      // Prev button
      const prevBtn = document.createElement('button');
      prevBtn.className = `px-3 py-1 rounded-md border ${currentPage === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300'}`;
      prevBtn.textContent = 'Prev';
      prevBtn.disabled = currentPage === 1;
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderAll();
        }
      });
      paginationEl.appendChild(prevBtn);

      // Page numbers (bounded to avoid too many)
      const maxButtons = 7;
      let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      let endPage = startPage + maxButtons - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxButtons + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pBtn = document.createElement('button');
        pBtn.className = `px-3 py-1 rounded-md border ${i === currentPage ? 'bg-indigo-600 text-white border-indigo-600' : 'text-gray-700 border-gray-300'}`;
        pBtn.textContent = String(i);
        pBtn.addEventListener('click', () => {
          currentPage = i;
          renderAll();
        });
        paginationEl.appendChild(pBtn);
      }

      // Next button
      const nextBtn = document.createElement('button');
      nextBtn.className = `px-3 py-1 rounded-md border ${currentPage === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300'}`;
      nextBtn.textContent = 'Next';
      nextBtn.disabled = currentPage === totalPages;
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderAll();
        }
      });
      paginationEl.appendChild(nextBtn);
    }

    // Events
    searchInputEl.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      currentPage = 1;
      renderAll();
    });

    pageSizeSelectEl.addEventListener('change', (e) => {
      pageSize = Number(e.target.value);
      currentPage = 1;
      renderAll();
    });

    // Initial render
    function renderAll() {
      renderCategoryFilters();
      renderPosts();
    }

    renderAll();