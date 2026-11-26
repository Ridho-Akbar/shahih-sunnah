'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translateCategoryName, translateDalilSource, translateDalilStatus } from '../lib/i18n';
import { containsSectionMarkup, stripHtmlToText } from '../lib/sanitizeHtml';
import { BlogEditorModal } from '../components/features/BlogEditorModal';
import { HadithEditorModal } from '../components/features/HadithEditorModal';
import { SunnahEditorModal } from '../components/features/SunnahEditorModal';
import { ZikirEditorModal } from '../components/features/ZikirEditorModal';
import {
  ZIKIR_TIME_LABELS,
  createCategorySchema,
  createFigureSchema,
  updateCategorySchema,
  type AnalyticsSummary,
  type BlogPost,
  type Category,
  type Hadith,
  type ScholarFigure,
  type SunnahGuideItem,
  type SunnahGuideType,
  type TimeOfDay,
  type Zikir,
} from '../lib/validations/content';

interface AdminHadisPageProps {
  categories: Category[];
  onDataChanged: () => Promise<void>;
}

type AdminSection =
  | 'overview'
  | 'hadiths'
  | 'zikrs'
  | 'sunnah'
  | 'blogs'
  | 'figures'
  | 'categories';

interface FigureFormState {
  id: number | null;
  name: string;
  fullName: string;
  nasab: string;
  nasabEn: string;
  role: string;
  roleEn: string;
  tabaqah: string;
  tabaqahEn: string;
  birthDeath: string;
  birthDeathEn: string;
  jarhWaTadil: string;
  jarhWaTadilEn: string;
  teachersAndStudents: string;
  teachersAndStudentsEn: string;
  majorWorks: string;
  majorWorksEn: string;
  biography: string;
  biographyEn: string;
  isPublished: boolean;
}

export function AdminHadisPage({ categories, onDataChanged }: AdminHadisPageProps) {
  const { isAuthenticated, authMode, statusLoading, login, loginWithGoogle, claim, logout, authFetch } = useAuth();
  const { lang, pick } = useLanguage();
  const isEn = lang === 'en';

  // Auth form states
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Admin workspace states
  const [section, setSection] = useState<AdminSection>('overview');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#blogs') {
      setSection('blogs');
    }
  }, []);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [zikrs, setZikrs] = useState<Zikir[]>([]);
  const [sunnahGuides, setSunnahGuides] = useState<SunnahGuideItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [figures, setFigures] = useState<ScholarFigure[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zikirTimeFilter, setZikirTimeFilter] = useState<'all' | TimeOfDay>('all');
  const [sunnahTypeFilter, setSunnahTypeFilter] = useState<'all' | SunnahGuideType>('all');

  // Inline delete confirmations
  const [confirmDeleteHadithId, setConfirmDeleteHadithId] = useState<number | null>(null);
  const [confirmDeleteZikirId, setConfirmDeleteZikirId] = useState<number | null>(null);
  const [confirmDeleteSunnahId, setConfirmDeleteSunnahId] = useState<number | null>(null);
  const [confirmDeleteBlogId, setConfirmDeleteBlogId] = useState<number | null>(null);
  const [confirmDeleteFigureId, setConfirmDeleteFigureId] = useState<number | null>(null);
  const [confirmDeleteCategoryId, setConfirmDeleteCategoryId] = useState<number | null>(null);

  // Shared Editor Modals
  const [hadithModalOpen, setHadithModalOpen] = useState(false);
  const [editingHadith, setEditingHadith] = useState<Hadith | null>(null);

  const [zikirModalOpen, setZikirModalOpen] = useState(false);
  const [editingZikir, setEditingZikir] = useState<Zikir | null>(null);

  const [sunnahModalOpen, setSunnahModalOpen] = useState(false);
  const [editingSunnah, setEditingSunnah] = useState<SunnahGuideItem | null>(null);

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);

  // Inline Modals (Scholar Figure & Category Edit)
  const [figureModalOpen, setFigureModalOpen] = useState(false);
  const [figureModalError, setFigureModalError] = useState<string | null>(null);
  const [figureForm, setFigureForm] = useState<FigureFormState>({
    id: null,
    name: '',
    fullName: '',
    nasab: '',
    nasabEn: '',
    role: '',
    roleEn: '',
    tabaqah: '',
    tabaqahEn: '',
    birthDeath: '',
    birthDeathEn: '',
    jarhWaTadil: '',
    jarhWaTadilEn: '',
    teachersAndStudents: '',
    teachersAndStudentsEn: '',
    majorWorks: '',
    majorWorksEn: '',
    biography: '',
    biographyEn: '',
    isPublished: true,
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryNameEn, setNewCategoryNameEn] = useState('');
  const [newCategorySlug, setNewCategorySlug] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatNameEn, setEditCatNameEn] = useState('');
  const [editCatSlug, setEditCatSlug] = useState('');
  const [categoryModalError, setCategoryModalError] = useState<string | null>(null);
  const [submittingForm, setSubmittingForm] = useState(false);

  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const loadAdminData = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingList(true);
    setActionError(null);
    try {
      const [aRes, hRes, zRes, sRes, bRes, fRes] = await Promise.all([
        authFetch('/api/admin/analytics'),
        authFetch('/api/admin/hadiths'),
        authFetch('/api/admin/zikrs'),
        authFetch('/api/admin/sunnah'),
        authFetch('/api/admin/blogs'),
        authFetch('/api/admin/figures'),
      ]);
      if (!aRes.ok || !hRes.ok || !zRes.ok || !sRes.ok || !bRes.ok || !fRes.ok) {
        throw new Error(isEn ? 'Failed to load admin data.' : 'Gagal memuat data admin.');
      }
      const aData = (await aRes.json()) as { analytics: AnalyticsSummary };
      const hData = (await hRes.json()) as { hadiths: Hadith[] };
      const zData = (await zRes.json()) as { zikrs: Zikir[] };
      const sData = (await sRes.json()) as { sunnahGuides: SunnahGuideItem[] };
      const bData = (await bRes.json()) as { blogs: BlogPost[] };
      const fData = (await fRes.json()) as { figures: ScholarFigure[] };
      setAnalytics(aData.analytics);
      setHadiths(hData.hadiths);
      setZikrs(zData.zikrs);
      setSunnahGuides(sData.sunnahGuides);
      setBlogs(bData.blogs);
      setFigures(fData.figures);
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'An error occurred while loading data.'
          : 'Terjadi kesalahan saat memuat data.'
      );
    } finally {
      setLoadingList(false);
    }
  }, [authFetch, isAuthenticated, isEn]);

  useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const showToast = (message: string) => {
    setActionMessage(message);
    window.setTimeout(() => {
      setActionMessage((curr) => (curr === message ? null : curr));
    }, 3500);
  };

  const handleAuthSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (authMode === 'unclaimed') {
      if (passcode.length < 8) {
        setAuthError(
          isEn ? 'Admin password must be at least 8 characters.' : 'Kata sandi admin minimal 8 karakter.'
        );
        return;
      }
      if (passcode !== confirmPasscode) {
        setAuthError(
          isEn ? 'Password confirmation does not match.' : 'Konfirmasi kata sandi tidak cocok.'
        );
        return;
      }
    }

    setAuthSubmitting(true);
    try {
      if (authMode === 'unclaimed') {
        await claim(passcode);
      } else {
        await login(passcode);
      }
      setPasscode('');
      setConfirmPasscode('');
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Authentication failed.'
          : 'Autentikasi gagal.'
      );
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Hadith CRUD Handlers
  const openCreateHadith = () => {
    setActionError(null);
    setEditingHadith(null);
    setHadithModalOpen(true);
  };

  const openEditHadith = (item: Hadith) => {
    setActionError(null);
    setEditingHadith(item);
    setHadithModalOpen(true);
  };

  const handleToggleHadithPublish = async (item: Hadith) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/hadiths/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(
          data.error || (isEn ? 'Failed to update publish status.' : 'Gagal mengubah status publikasi.')
        );
      }
      await loadAdminData();
      await onDataChanged();
      showToast(
        !item.isPublished
          ? isEn
            ? 'Hadith published.'
            : 'Hadis dipublikasikan.'
          : isEn
          ? 'Hadith saved as draft.'
          : 'Hadis disimpan sebagai draf.'
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update publish status.'
          : 'Gagal mengubah status publikasi.'
      );
    }
  };

  const handleDeleteHadith = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/hadiths/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || (isEn ? 'Failed to delete hadith.' : 'Gagal menghapus hadis.'));
      }
      setConfirmDeleteHadithId(null);
      await loadAdminData();
      await onDataChanged();
      showToast(isEn ? 'Hadith deleted.' : 'Hadis berhasil dihapus.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : isEn ? 'Failed to delete hadith.' : 'Gagal menghapus hadis.'
      );
    }
  };

  // Zikir CRUD Handlers
  const openCreateZikir = () => {
    setActionError(null);
    setEditingZikir(null);
    setZikirModalOpen(true);
  };

  const openEditZikir = (item: Zikir) => {
    setActionError(null);
    setEditingZikir(item);
    setZikirModalOpen(true);
  };

  const handleToggleZikirPublish = async (item: Zikir) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/zikrs/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(
          data.error || (isEn ? 'Failed to update dhikr status.' : 'Gagal mengubah status zikir.')
        );
      }
      await loadAdminData();
      await onDataChanged();
      showToast(
        !item.isPublished
          ? isEn
            ? 'Dhikr published.'
            : 'Zikir dipublikasikan.'
          : isEn
          ? 'Dhikr saved as draft.'
          : 'Zikir disimpan sebagai draf.'
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update dhikr status.'
          : 'Gagal mengubah status zikir.'
      );
    }
  };

  const handleDeleteZikir = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/zikrs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || (isEn ? 'Failed to delete dhikr.' : 'Gagal menghapus zikir.'));
      }
      setConfirmDeleteZikirId(null);
      await loadAdminData();
      await onDataChanged();
      showToast(isEn ? 'Dhikr deleted.' : 'Zikir berhasil dihapus.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : isEn ? 'Failed to delete dhikr.' : 'Gagal menghapus zikir.'
      );
    }
  };

  // Sunnah Guides CRUD Handlers
  const openCreateSunnah = () => {
    setActionError(null);
    setEditingSunnah(null);
    setSunnahModalOpen(true);
  };

  const openEditSunnah = (item: SunnahGuideItem) => {
    setActionError(null);
    setEditingSunnah(item);
    setSunnahModalOpen(true);
  };

  const handleToggleSunnahPublish = async (item: SunnahGuideItem) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/sunnah/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to update guide status.' : 'Gagal mengubah status panduan.');
      }
      await loadAdminData();
      await onDataChanged();
      showToast(
        !item.isPublished
          ? isEn
            ? 'Guide published.'
            : 'Panduan dipublikasikan.'
          : isEn
          ? 'Guide saved as draft.'
          : 'Panduan disimpan sebagai draf.'
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update status.'
          : 'Gagal mengubah status.'
      );
    }
  };

  const handleDeleteSunnah = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/sunnah/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(isEn ? 'Failed to delete guide.' : 'Gagal menghapus panduan.');
      setConfirmDeleteSunnahId(null);
      await loadAdminData();
      await onDataChanged();
      showToast(isEn ? 'Sunnah guide deleted.' : 'Panduan sunnah dihapus.');
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete guide.'
          : 'Gagal menghapus panduan.'
      );
    }
  };

  // Blog CRUD Handlers
  const openCreateBlog = () => {
    setActionError(null);
    setEditingBlogPost(null);
    setBlogModalOpen(true);
  };

  const openEditBlog = (item: BlogPost) => {
    setActionError(null);
    setEditingBlogPost(item);
    setBlogModalOpen(true);
  };

  const handleToggleBlogPublish = async (item: BlogPost) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/blogs/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to update article status.' : 'Gagal mengubah status artikel.');
      }
      await loadAdminData();
      await onDataChanged();
      showToast(
        !item.isPublished
          ? isEn
            ? 'Article published.'
            : 'Artikel dipublikasikan.'
          : isEn
          ? 'Article saved as draft.'
          : 'Artikel disimpan sebagai draf.'
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update article status.'
          : 'Gagal mengubah status artikel.'
      );
    }
  };

  const handleDeleteBlog = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(isEn ? 'Failed to delete article.' : 'Gagal menghapus artikel.');
      setConfirmDeleteBlogId(null);
      await loadAdminData();
      await onDataChanged();
      showToast(isEn ? 'Article deleted.' : 'Artikel berhasil dihapus.');
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete article.'
          : 'Gagal menghapus artikel.'
      );
    }
  };

  // Close inline Figure / Category modals on Escape key
  useEffect(() => {
    if (!figureModalOpen && !categoryModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (categoryModalOpen) setCategoryModalOpen(false);
        else if (figureModalOpen) setFigureModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [figureModalOpen, categoryModalOpen]);

  // Scholar Figures CRUD Handlers
  const openCreateFigure = () => {
    setFigureModalError(null);
    setFigureForm({
      id: null,
      name: '',
      fullName: '',
      nasab: '',
      nasabEn: '',
      role: '',
      roleEn: '',
      tabaqah: '',
      tabaqahEn: '',
      birthDeath: '',
      birthDeathEn: '',
      jarhWaTadil: '',
      jarhWaTadilEn: '',
      teachersAndStudents: '',
      teachersAndStudentsEn: '',
      majorWorks: '',
      majorWorksEn: '',
      biography: '',
      biographyEn: '',
      isPublished: true,
    });
    setFigureModalOpen(true);
  };

  const openEditFigure = (item: ScholarFigure) => {
    setFigureModalError(null);
    setFigureForm({
      id: item.id,
      name: item.name,
      fullName: item.fullName,
      nasab: item.nasab || '',
      nasabEn: item.nasabEn || '',
      role: item.role,
      roleEn: item.roleEn || '',
      tabaqah: item.tabaqah || '',
      tabaqahEn: item.tabaqahEn || '',
      birthDeath: item.birthDeath || '',
      birthDeathEn: item.birthDeathEn || '',
      jarhWaTadil: item.jarhWaTadil || '',
      jarhWaTadilEn: item.jarhWaTadilEn || '',
      teachersAndStudents: item.teachersAndStudents || '',
      teachersAndStudentsEn: item.teachersAndStudentsEn || '',
      majorWorks: item.majorWorks || '',
      majorWorksEn: item.majorWorksEn || '',
      biography: item.biography,
      biographyEn: item.biographyEn || '',
      isPublished: item.isPublished,
    });
    setFigureModalOpen(true);
  };

  const handleSaveFigure = async (e: FormEvent) => {
    e.preventDefault();
    setFigureModalError(null);

    const parsed = createFigureSchema.safeParse({
      name: figureForm.name,
      fullName: figureForm.fullName,
      nasab: figureForm.nasab,
      nasabEn: figureForm.nasabEn,
      role: figureForm.role,
      roleEn: figureForm.roleEn,
      tabaqah: figureForm.tabaqah,
      tabaqahEn: figureForm.tabaqahEn,
      birthDeath: figureForm.birthDeath,
      birthDeathEn: figureForm.birthDeathEn,
      jarhWaTadil: figureForm.jarhWaTadil,
      jarhWaTadilEn: figureForm.jarhWaTadilEn,
      teachersAndStudents: figureForm.teachersAndStudents,
      teachersAndStudentsEn: figureForm.teachersAndStudentsEn,
      majorWorks: figureForm.majorWorks,
      majorWorksEn: figureForm.majorWorksEn,
      biography: figureForm.biography,
      biographyEn: figureForm.biographyEn,
      isPublished: figureForm.isPublished,
    });

    if (!parsed.success) {
      setFigureModalError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Please review the scholar/narrator inputs.' : 'Periksa kembali input tokoh/perawi.')
      );
      return;
    }

    setSubmittingForm(true);
    try {
      const isEdit = figureForm.id !== null;
      const url = isEdit ? `/api/admin/figures/${figureForm.id}` : '/api/admin/figures';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || (isEn ? 'Failed to save scholar profile.' : 'Gagal menyimpan data tokoh.'));
      }

      setFigureModalOpen(false);
      await loadAdminData();
      await onDataChanged();
      showToast(
        isEdit
          ? isEn
            ? 'Scholar profile updated.'
            : 'Data tokoh berhasil diperbarui.'
          : isEn
          ? 'New scholar/narrator added.'
          : 'Tokoh/perawi baru berhasil ditambahkan.'
      );
    } catch (err) {
      setFigureModalError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to save scholar profile.'
          : 'Gagal menyimpan data tokoh.'
      );
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleToggleFigurePublish = async (item: ScholarFigure) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/figures/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(
          isEn ? 'Failed to update scholar status.' : 'Gagal mengubah status publikasi tokoh.'
        );
      }
      await loadAdminData();
      await onDataChanged();
      showToast(
        !item.isPublished
          ? isEn
            ? 'Scholar activated for click links.'
            : 'Tokoh diaktifkan agar bisa diklik.'
          : isEn
          ? 'Scholar deactivated (draft).'
          : 'Tokoh dinonaktifkan (draf).'
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update scholar status.'
          : 'Gagal mengubah status tokoh.'
      );
    }
  };

  const handleDeleteFigure = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/figures/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(isEn ? 'Failed to delete scholar.' : 'Gagal menghapus tokoh.');
      setConfirmDeleteFigureId(null);
      await loadAdminData();
      await onDataChanged();
      showToast(isEn ? 'Scholar profile deleted.' : 'Data tokoh berhasil dihapus.');
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete scholar.'
          : 'Gagal menghapus tokoh.'
      );
    }
  };

  // Category CRUD Handlers
  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();
    setActionError(null);
    const slug =
      newCategorySlug.trim() ||
      newCategoryName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const parsed = createCategorySchema.safeParse({
      name: newCategoryName,
      nameEn: newCategoryNameEn,
      slug,
    });
    if (!parsed.success) {
      setActionError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Category validation failed.' : 'Validasi kategori gagal.')
      );
      return;
    }

    setSubmittingForm(true);
    try {
      const res = await authFetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || (isEn ? 'Failed to add category.' : 'Gagal menambah kategori.'));
      }
      setNewCategoryName('');
      setNewCategoryNameEn('');
      setNewCategorySlug('');
      await onDataChanged();
      showToast(isEn ? 'New category added.' : 'Kategori baru berhasil ditambahkan.');
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : isEn ? 'Failed to add category.' : 'Gagal menambah kategori.'
      );
    } finally {
      setSubmittingForm(false);
    }
  };

  const openEditCategory = (cat: Category) => {
    setCategoryModalError(null);
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditCatNameEn(cat.nameEn || '');
    setEditCatSlug(cat.slug);
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setCategoryModalError(null);

    const slug =
      editCatSlug.trim() ||
      editCatName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const parsed = updateCategorySchema.safeParse({
      name: editCatName,
      nameEn: editCatNameEn,
      slug,
    });

    if (!parsed.success) {
      setCategoryModalError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Category validation failed.' : 'Validasi kategori gagal.')
      );
      return;
    }

    setSubmittingForm(true);
    try {
      const res = await authFetch(`/api/admin/categories/${editingCategory.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || (isEn ? 'Failed to update category.' : 'Gagal memperbarui kategori.'));
      }
      setCategoryModalOpen(false);
      await onDataChanged();
      showToast(isEn ? 'Category updated.' : 'Kategori berhasil diperbarui.');
    } catch (err) {
      setCategoryModalError(
        err instanceof Error ? err.message : isEn ? 'Failed to update category.' : 'Gagal memperbarui kategori.'
      );
    } finally {
      setSubmittingForm(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setActionError(null);
    try {
      const res = await authFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || (isEn ? 'Failed to delete category.' : 'Gagal menghapus kategori.'));
      }
      setConfirmDeleteCategoryId(null);
      await onDataChanged();
      showToast(isEn ? 'Category deleted.' : 'Kategori berhasil dihapus.');
    } catch (err) {
      setConfirmDeleteCategoryId(null);
      setActionError(
        err instanceof Error ? err.message : isEn ? 'Failed to delete category.' : 'Gagal menghapus kategori.'
      );
    }
  };

  const filteredHadiths = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return hadiths.filter((item) => {
      if (categoryFilter !== 'all' && item.categoryId !== categoryFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.translation.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.narrator.toLowerCase().includes(q)
      );
    });
  }, [hadiths, categoryFilter, searchQuery]);

  const filteredZikrs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return zikrs.filter((item) => {
      if (zikirTimeFilter !== 'all' && item.timeOfDay !== zikirTimeFilter) return false;
      if (!q) return true;
      return item.title.toLowerCase().includes(q) || item.translation.toLowerCase().includes(q);
    });
  }, [zikrs, zikirTimeFilter, searchQuery]);

  const filteredSunnah = useMemo(() => {
    return sunnahGuides.filter((item) => {
      if (sunnahTypeFilter !== 'all' && item.guideType !== sunnahTypeFilter) return false;
      return true;
    });
  }, [sunnahGuides, sunnahTypeFilter]);

  const filteredFigures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return figures.filter((item) => {
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.fullName.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.nasab.toLowerCase().includes(q)
      );
    });
  }, [figures, searchQuery]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogs.filter((post) => {
      if (categoryFilter !== 'all' && post.categoryId !== categoryFilter) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.titleEn || '').toLowerCase().includes(q) ||
        stripHtmlToText(post.excerpt).toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
      );
    });
  }, [blogs, categoryFilter, searchQuery]);

  // Auth Gate View
  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto py-8">
        <div className="neu-outset p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="neu-inset-sm p-3 text-primary-600 dark:text-primary-400">
              <Lock className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                {authMode === 'unclaimed'
                  ? isEn
                    ? 'Activate Admin Password'
                    : 'Aktivasi Kata Sandi Admin'
                  : isEn
                  ? 'Admin Panel Sign In'
                  : 'Masuk Panel Admin'}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                {isEn
                  ? 'Admin page is protected by server-side authentication.'
                  : 'Halaman Admin dilindungi autentikasi server.'}
              </p>
            </div>
          </div>

          <p className="mt-5 font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            {authMode === 'unclaimed'
              ? isEn
                ? 'Admin password has not been configured yet. Create an initial manager password to secure analytics and Hadith, Dhikr, Sunnah, and Blog management.'
                : 'Kata sandi admin belum diatur. Buat kata sandi pengelola pertama kali untuk mengamankan akses dasbor analitik serta CRUD Hadis, Zikir, Sunnah, dan Blog.'
              : isEn
              ? 'Enter the manager password to access the website analytics dashboard and edit content.'
              : 'Masukkan kata sandi pengelola untuk mengakses dasbor statistik website dan menyunting konten.'}
          </p>

          {statusLoading ? (
            <div className="mt-6 h-32 animate-pulse rounded-xl bg-[var(--color-border)]/40" />
          ) : (
            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="admin-passcode"
                  className="block text-xs font-semibold text-[var(--color-text-primary)] mb-2"
                >
                  {authMode === 'unclaimed'
                    ? isEn
                      ? 'New Admin Password'
                      : 'Kata Sandi Admin Baru'
                    : isEn
                    ? 'Admin Password'
                    : 'Kata Sandi Admin'}
                </label>
                <input
                  id="admin-passcode"
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder={
                    authMode === 'unclaimed'
                      ? isEn
                        ? 'Minimum 8 characters'
                        : 'Minimal 8 karakter'
                      : isEn
                      ? 'Enter password'
                      : 'Masukkan kata sandi'
                  }
                  className="neu-inset-sm w-full px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[44px]"
                />
              </div>

              {authMode === 'unclaimed' && (
                <div>
                  <label
                    htmlFor="admin-passcode-confirm"
                    className="block text-xs font-semibold text-[var(--color-text-primary)] mb-2"
                  >
                    {isEn ? 'Confirm Password' : 'Konfirmasi Kata Sandi'}
                  </label>
                  <input
                    id="admin-passcode-confirm"
                    type="password"
                    required
                    value={confirmPasscode}
                    onChange={(e) => setConfirmPasscode(e.target.value)}
                    placeholder={isEn ? 'Repeat password' : 'Ulangi kata sandi'}
                    className="neu-inset-sm w-full px-4 py-3 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[44px]"
                  />
                </div>
              )}

              {authError && (
                <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-3 px-5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors cursor-pointer min-h-[44px]"
              >
                {authSubmitting
                  ? isEn
                    ? 'Processing...'
                    : 'Memproses...'
                  : authMode === 'unclaimed'
                  ? isEn
                    ? 'Save Password & Sign In'
                    : 'Simpan Kata Sandi & Masuk'
                  : isEn
                  ? 'Enter Admin Panel'
                  : 'Masuk ke Panel Admin'}
              </button>

              <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-2.5">
                <p className="text-[11px] text-center text-[var(--color-text-secondary)]">
                  {isEn ? 'Or sign in using authorized Google Admin account' : 'Atau masuk dengan akun Google Admin terdaftar'}
                </p>
                <button
                  type="button"
                  disabled={authSubmitting}
                  onClick={() => {
                    setAuthError(null);
                    setAuthSubmitting(true);
                    void loginWithGoogle()
                      .catch((err) => {
                        setAuthError(
                          err instanceof Error
                            ? err.message
                            : isEn
                            ? 'Google sign-in failed.'
                            : 'Gagal masuk dengan Google.'
                        );
                      })
                      .finally(() => setAuthSubmitting(false));
                  }}
                  className="neu-outset-sm w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer min-h-[42px]"
                >
                  {isEn ? 'Sign in with Google' : 'Masuk dengan Google'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Admin Header */}
      <div className="neu-outset p-6 sm:p-8">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
              {isEn ? 'Management & Analytics Dashboard' : 'Dasbor Pengelola & Analitik'}
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {isEn ? 'Shahih Sunnah Admin' : 'Admin Shahih Sunnah'}
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {isEn
                ? 'Monitor reader traffic, registered users, and manage Hadith, evidences, tafsir, Dhikr, Sunnah guides, scholars, and Blog articles.'
                : 'Pantau trafik pembaca, user bergabung, serta kelola hadis, dalil, tafsir, zikir, tuntunan sunnah, dan blog.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="neu-inset-sm p-1 inline-flex flex-wrap items-center gap-1">
              {(
                [
                  { id: 'overview', label: isEn ? 'Dashboard' : 'Dasbor' },
                  { id: 'hadiths', label: isEn ? `Hadith (${hadiths.length})` : `Hadis (${hadiths.length})` },
                  { id: 'zikrs', label: isEn ? `Dhikr (${zikrs.length})` : `Zikir (${zikrs.length})` },
                  { id: 'sunnah', label: `Sunnah (${sunnahGuides.length})` },
                  { id: 'blogs', label: `Blog (${blogs.length})` },
                  {
                    id: 'figures',
                    label: isEn ? `Scholars (${figures.length})` : `Tokoh & Perawi (${figures.length})`,
                  },
                  {
                    id: 'categories',
                    label: isEn ? `Categories (${categories.length})` : `Kategori (${categories.length})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSection(tab.id);
                    setActionError(null);
                  }}
                  className={`px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    section === tab.id
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={logout}
              className="neu-outset-sm inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] hover:text-red-600 dark:hover:text-red-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? 'Sign Out' : 'Keluar'}</span>
            </button>
          </div>
        </div>

        {/* Feedback banners */}
        {actionMessage && (
          <div
            role="status"
            className="mt-5 neu-inset-sm px-4 py-3 text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center gap-2"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{actionMessage}</span>
          </div>
        )}
        {actionError &&
          !hadithModalOpen &&
          !zikirModalOpen &&
          !sunnahModalOpen &&
          !blogModalOpen &&
          !figureModalOpen &&
          !categoryModalOpen && (
            <div
              role="alert"
              className="mt-5 neu-inset-sm px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
            >
              {actionError}
            </div>
          )}
      </div>

      {/* SECTION: ANALYTICS OVERVIEW DASHBOARD */}
      {section === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="neu-outset p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
                <span>{isEn ? 'Site Visits' : 'Buka Website'}</span>
                <BarChart3 className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {analytics?.siteVisits ?? 0}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isEn ? 'Recorded visit sessions' : 'Sesi kunjungan tercatat'}
              </p>
            </div>

            <div className="neu-outset p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
                <span>{isEn ? 'Blog Reads' : 'Baca Blog'}</span>
                <BookOpen className="w-4 h-4 text-accent-600 dark:text-accent-400" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {analytics?.blogReads ?? 0}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isEn ? 'Total article views' : 'Total pembukaan artikel'}
              </p>
            </div>

            <div className="neu-outset p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
                <span>{isEn ? 'Joined Users' : 'User Join'}</span>
                <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {analytics?.userJoins ?? 0}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isEn ? 'Active leaderboard members' : 'Peserta peringkat aktif'}
              </p>
            </div>

            <div className="neu-outset p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-secondary)]">
                <span>{isEn ? 'Dhikr Completed' : 'Zikir Selesai'}</span>
                <CheckCircle2 className="w-4 h-4 text-accent-600 dark:text-accent-400" aria-hidden="true" />
              </div>
              <p className="text-3xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {analytics?.zikirCompletions ?? 0}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {isEn ? 'Completed recitations' : 'Bacaan tuntas pembaca'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 neu-outset p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] pb-3 border-b border-[var(--color-border)]/60">
                {isEn ? 'Most Read Blog Articles' : 'Artikel Blog Terbanyak Dibaca'}
              </h2>
              {analytics && analytics.topBlogs.length > 0 ? (
                <div className="space-y-3">
                  {analytics.topBlogs.map((item, idx) => (
                    <div
                      key={item.id}
                      className="neu-inset-sm px-4 py-3 flex items-center justify-between gap-4"
                    >
                      <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                        <span className="font-mono text-xs text-[var(--color-text-secondary)] mr-2">
                          {idx + 1}.
                        </span>
                        {item.title}
                      </p>
                      <span className="text-xs font-bold font-mono tabular-nums text-primary-600 dark:text-primary-400 shrink-0">
                        {isEn ? `${item.views} reads` : `${item.views} dibaca`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {isEn ? 'No blog readership data yet.' : 'Belum ada data pembaca blog.'}
                </p>
              )}
            </div>

            <div className="lg:col-span-6 neu-outset p-6 space-y-4">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)] pb-3 border-b border-[var(--color-border)]/60">
                {isEn ? 'Recently Joined Users (Leaderboard)' : 'Pengguna Terbaru Bergabung (Peringkat)'}
              </h2>
              {analytics && analytics.recentUsers.length > 0 ? (
                <div className="space-y-3">
                  {analytics.recentUsers.map((usr) => (
                    <div
                      key={usr.id}
                      className="neu-inset-sm px-4 py-3 flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">
                          {usr.username}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] tabular-nums">
                          {isEn ? `${usr.zikirCompleted} dhikr` : `${usr.zikirCompleted} zikir`}
                        </p>
                      </div>
                      <span className="text-xs font-bold font-mono tabular-nums text-accent-600 dark:text-accent-400">
                        {isEn ? `${usr.points} pts` : `${usr.points} poin`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {isEn
                    ? 'No users have joined the leaderboard yet.'
                    : 'Belum ada pengguna yang mendaftar di halaman Peringkat.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: HADITHS */}
      {section === 'hadiths' && (
        <div className="space-y-6">
          <div className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search
                  className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search hadith...' : 'Cari hadis...'}
                  aria-label={isEn ? 'Search hadith in admin' : 'Cari hadis di admin'}
                  className="neu-inset-sm w-full pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                aria-label={isEn ? 'Filter hadith category' : 'Filter kategori hadis'}
                className="neu-inset-sm px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
              >
                <option value="all">{isEn ? 'All Categories' : 'Semua Kategori'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {translateCategoryName(cat.name, lang, cat.nameEn)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={openCreateHadith}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? 'Add Hadith' : 'Tambah Hadis'}</span>
            </button>
          </div>

          {loadingList ? (
            <div className="neu-outset p-8 animate-pulse space-y-4">
              <div className="h-10 bg-[var(--color-border)]/40 rounded-lg" />
              <div className="h-10 bg-[var(--color-border)]/40 rounded-lg" />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHadiths.map((item) => {
                const cat = categoryById.get(item.categoryId);
                return (
                <div
                  key={item.id}
                  className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                      <span className="tabular-nums">#{item.id}</span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {translateCategoryName(cat?.name || 'Umum', lang, cat?.nameEn)}
                      </span>
                      {item.source && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{translateDalilSource(item.source, lang)}</span>
                        </>
                      )}
                      {item.dalilStatus && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-primary-600 dark:text-primary-400 font-semibold">
                            {translateDalilStatus(item.dalilStatus, lang)}
                          </span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          item.isPublished
                            ? 'text-primary-600 dark:text-primary-400 font-semibold'
                            : 'text-amber-700 dark:text-amber-400 font-semibold'
                        }
                      >
                        {item.isPublished
                          ? isEn
                            ? 'Published'
                            : 'Terbit'
                          : isEn
                          ? 'Draft'
                          : 'Draf'}
                      </span>
                    </p>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {pick(item.title, item.titleEn)}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 max-w-3xl">
                      {pick(item.translation, item.translationEn)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => void handleToggleHadithPublish(item)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                    >
                      {item.isPublished ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEn ? 'Set Draft' : 'Jadikan Draf'}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEn ? 'Publish' : 'Publikasikan'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditHadith(item)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                    >
                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Edit' : 'Sunting'}</span>
                    </button>

                    {confirmDeleteHadithId === item.id ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => void handleDeleteHadith(item.id)}
                          className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                        >
                          {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteHadithId(null)}
                          className="neu-outset-sm px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] cursor-pointer min-h-[40px]"
                        >
                          {isEn ? 'Cancel' : 'Batal'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteHadithId(item.id)}
                        className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Delete' : 'Hapus'}</span>
                      </button>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION: ZIKRS */}
      {section === 'zikrs' && (
        <div className="space-y-6">
          <div className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="neu-inset-sm p-1 inline-flex flex-wrap items-center gap-1">
              {(['all', 'pagi', 'petang', 'setelah-sholat', 'umum', 'khusus'] as const).map((timeKey) => (
                <button
                  key={timeKey}
                  type="button"
                  onClick={() => setZikirTimeFilter(timeKey)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                    zikirTimeFilter === timeKey
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {timeKey === 'all' ? (isEn ? 'All' : 'Semua') : ZIKIR_TIME_LABELS[timeKey][lang]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={openCreateZikir}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? 'Add Dhikr' : 'Tambah Zikir'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredZikrs.map((item) => (
              <div
                key={item.id}
                className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                    <span className="tabular-nums">#{item.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{ZIKIR_TIME_LABELS[item.timeOfDay][lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {item.repeatCount === 0
                        ? isEn
                          ? 'Unlimited'
                          : 'Tanpa Batasan'
                        : `${item.repeatCount}x`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {translateDalilStatus(item.dalilStatus || 'Shahih', lang)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        item.isPublished
                          ? 'text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-amber-700 dark:text-amber-400 font-semibold'
                      }
                    >
                      {item.isPublished
                        ? isEn
                          ? 'Published'
                          : 'Terbit'
                        : isEn
                        ? 'Draft'
                        : 'Draf'}
                    </span>
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {pick(item.title, item.titleEn)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 max-w-3xl">
                    {pick(item.translation, item.translationEn)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void handleToggleZikirPublish(item)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                  >
                    {item.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Set Draft' : 'Jadikan Draf'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Publish' : 'Publikasikan'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditZikir(item)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEn ? 'Edit' : 'Sunting'}</span>
                  </button>

                  {confirmDeleteZikirId === item.id ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void handleDeleteZikir(item.id)}
                        className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteZikirId(null)}
                        className="neu-outset-sm px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteZikirId(item.id)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Delete' : 'Hapus'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: SUNNAH GUIDES */}
      {section === 'sunnah' && (
        <div className="space-y-6">
          <div className="neu-outset p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="neu-inset-sm p-1 inline-flex flex-wrap items-center gap-1">
              {(
                [
                  { id: 'all', label: isEn ? 'All' : 'Semua' },
                  { id: 'sholat', label: isEn ? 'Prayer Guide' : 'Tata Cara Sholat' },
                  { id: 'kebiasaan', label: isEn ? 'Sunnah Habits' : 'Kebiasaan Sunnah' },
                ] as const
              ).map((tabOpt) => (
                <button
                  key={tabOpt.id}
                  type="button"
                  onClick={() => setSunnahTypeFilter(tabOpt.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap cursor-pointer ${
                    sunnahTypeFilter === tabOpt.id
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {tabOpt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={openCreateSunnah}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? 'Add Sunnah Guide' : 'Tambah Panduan Sunnah'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredSunnah.map((item) => (
              <div
                key={item.id}
                className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                    <span className="font-mono tabular-nums">
                      {isEn ? `Step ${item.stepOrder}` : `Langkah ${item.stepOrder}`}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {item.guideType === 'sholat'
                        ? isEn
                          ? 'Sunnah Prayer'
                          : 'Sholat Sunnah'
                        : isEn
                        ? 'Sunnah Habits'
                        : 'Kebiasaan Sunnah'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{translateDalilSource(item.dalilSource, lang)}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        item.isPublished
                          ? 'text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-amber-700 dark:text-amber-400 font-semibold'
                      }
                    >
                      {item.isPublished
                        ? isEn
                          ? 'Published'
                          : 'Terbit'
                        : isEn
                        ? 'Draft'
                        : 'Draf'}
                    </span>
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {pick(item.title, item.titleEn)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 max-w-3xl">
                    {pick(item.translation, item.translationEn)}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void handleToggleSunnahPublish(item)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    {item.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Draft' : 'Draf'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Publish' : 'Terbit'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditSunnah(item)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEn ? 'Edit' : 'Sunting'}</span>
                  </button>

                  {confirmDeleteSunnahId === item.id ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void handleDeleteSunnah(item.id)}
                        className="px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Delete' : 'Hapus'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteSunnahId(null)}
                        className="neu-outset-sm px-3 py-2 text-xs font-medium cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteSunnahId(item.id)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[40px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Delete' : 'Hapus'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: BLOGS */}
      {section === 'blogs' && (
        <div className="space-y-6">
          <div className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search
                  className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? 'Search blog articles...' : 'Cari artikel blog...'}
                  aria-label={isEn ? 'Search blog articles in admin' : 'Cari artikel blog di admin'}
                  className="neu-inset-sm w-full pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                aria-label={isEn ? 'Filter blog category' : 'Filter kategori blog'}
                className="neu-inset-sm px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
              >
                <option value="all">{isEn ? 'All Categories' : 'Semua Kategori'}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {translateCategoryName(cat.name, lang, cat.nameEn)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={openCreateBlog}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{isEn ? 'Write Article' : 'Tulis Artikel'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredBlogs.map((post) => {
              const cat = categoryById.get(post.categoryId);
              const usesSectionHtml =
                containsSectionMarkup(post.excerpt) ||
                containsSectionMarkup(post.content);
              return (
              <div
                key={post.id}
                className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                    <span className="tabular-nums">#{post.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {translateCategoryName(
                        cat?.name || (isEn ? 'Article' : 'Artikel'),
                        lang,
                        cat?.nameEn
                      )}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.author}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {isEn ? `${post.views} reads` : `${post.views} dibaca`}
                    </span>
                    {usesSectionHtml && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono text-accent-600 dark:text-accent-400 font-semibold">
                          &lt;section&gt; HTML
                        </span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        post.isPublished
                          ? 'text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-amber-700 dark:text-amber-400 font-semibold'
                      }
                    >
                      {post.isPublished
                        ? isEn
                          ? 'Published'
                          : 'Terbit'
                        : isEn
                        ? 'Draft'
                        : 'Draf'}
                    </span>
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {pick(post.title, post.titleEn)}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 max-w-3xl">
                    {stripHtmlToText(pick(post.excerpt, post.excerptEn))}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void handleToggleBlogPublish(post)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    {post.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Set Draft' : 'Jadikan Draf'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Publish' : 'Publikasikan'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditBlog(post)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEn ? 'Edit' : 'Sunting'}</span>
                  </button>

                  {confirmDeleteBlogId === post.id ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void handleDeleteBlog(post.id)}
                        className="px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteBlogId(null)}
                        className="neu-outset-sm px-3 py-2 text-xs font-medium cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteBlogId(post.id)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[40px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Delete' : 'Hapus'}</span>
                    </button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: SCHOLAR FIGURES / TOKOH & PERAWI */}
      {section === 'figures' && (
        <div className="space-y-6">
          <div className="neu-outset p-5 sm:p-6 space-y-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isEn
                      ? 'Search scholar name, lineage, or rank...'
                      : 'Cari nama tokoh, nasab, atau kedudukan...'
                  }
                  aria-label={isEn ? 'Search scholars and narrators' : 'Cari tokoh dan perawi'}
                  className="neu-inset-sm w-full pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                />
              </div>

              <button
                type="button"
                onClick={openCreateFigure}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? 'Add Scholar / Narrator' : 'Tambah Tokoh / Perawi'}</span>
              </button>
            </div>

            <div className="neu-inset-sm p-4 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text-primary)]">
                {isEn ? 'Strict Exact-Match Rule:' : 'Aturan Pencocokan Ketat:'}
              </strong>{' '}
              {isEn
                ? 'Only names added to this list with exact spelling (no typos and case-sensitive) become clickable links across the site to open the lineage & hadith science modal.'
                : 'Hanya nama yang sudah ditambahkan di daftar ini dengan ejaan persis (tanpa typo dan sesuai huruf besar/kecil) yang akan menjadi tautan dapat diklik di seluruh halaman website untuk memunculkan modal jalur nasab & ilmu hadis.'}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFigures.map((fig) => (
              <div
                key={fig.id}
                className="neu-outset p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                    <span className="font-mono tabular-nums">#{fig.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pick(fig.role, fig.roleEn)}</span>
                    {fig.tabaqah && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{pick(fig.tabaqah, fig.tabaqahEn)}</span>
                      </>
                    )}
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        fig.isPublished
                          ? 'text-primary-600 dark:text-primary-400 font-semibold'
                          : 'text-amber-700 dark:text-amber-400 font-semibold'
                      }
                    >
                      {fig.isPublished
                        ? isEn
                          ? 'Active (Clickable)'
                          : 'Aktif (Bisa Diklik)'
                        : isEn
                        ? 'Inactive (Draft)'
                        : 'Nonaktif (Draf)'}
                    </span>
                  </p>
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {fig.name}{' '}
                    <span className="text-sm font-normal text-[var(--color-text-secondary)]">
                      — {fig.fullName}
                    </span>
                  </h3>
                  {fig.nasab && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] line-clamp-2 max-w-3xl">
                      {isEn ? 'Lineage:' : 'Nasab:'} {pick(fig.nasab, fig.nasabEn)}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => void handleToggleFigurePublish(fig)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    {fig.isPublished ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Deactivate' : 'Nonaktifkan'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Activate' : 'Aktifkan'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => openEditFigure(fig)}
                    className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                  >
                    <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{isEn ? 'Edit' : 'Sunting'}</span>
                  </button>

                  {confirmDeleteFigureId === fig.id ? (
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => void handleDeleteFigure(fig.id)}
                        className="px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteFigureId(null)}
                        className="neu-outset-sm px-3 py-2 text-xs font-medium cursor-pointer min-h-[40px]"
                      >
                        {isEn ? 'Cancel' : 'Batal'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteFigureId(fig.id)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[40px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Delete' : 'Hapus'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: CATEGORIES (FULL CRUD) */}
      {section === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handleCreateCategory} className="lg:col-span-5 neu-outset p-6 space-y-4 self-start">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {isEn ? 'Add New Category' : 'Tambah Kategori Baru'}
            </h2>
            <div>
              <label
                htmlFor="cat-name"
                className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
              >
                {isEn ? 'Category Name (ID) *' : 'Nama Kategori (ID) *'}
              </label>
              <input
                id="cat-name"
                type="text"
                required
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={isEn ? 'e.g., Doa Harian' : 'Misal: Doa Harian'}
                className="neu-inset-sm w-full px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
              />
            </div>

            <div>
              <label
                htmlFor="cat-name-en"
                className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
              >
                {isEn ? 'English Name (Optional)' : 'Nama Inggris (Opsional)'}
              </label>
              <input
                id="cat-name-en"
                type="text"
                value={newCategoryNameEn}
                onChange={(e) => setNewCategoryNameEn(e.target.value)}
                placeholder={isEn ? 'e.g., Daily Supplications' : 'Misal: Daily Supplications'}
                className="neu-inset-sm w-full px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
              />
            </div>

            <div>
              <label
                htmlFor="cat-slug"
                className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
              >
                {isEn ? 'Slug (optional)' : 'Slug (opsional)'}
              </label>
              <input
                id="cat-slug"
                type="text"
                value={newCategorySlug}
                onChange={(e) => setNewCategorySlug(e.target.value)}
                placeholder="doa-harian"
                className="neu-inset-sm w-full px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
              />
            </div>

            <button
              type="submit"
              disabled={submittingForm}
              className="w-full py-2.5 px-5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer min-h-[44px]"
            >
              {submittingForm
                ? isEn
                  ? 'Saving...'
                  : 'Menyimpan...'
                : isEn
                ? 'Save Category'
                : 'Simpan Kategori'}
            </button>
          </form>

          <div className="lg:col-span-7 neu-outset p-6 space-y-3">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] pb-3 border-b border-[var(--color-border)]/60">
              {isEn ? 'Available Categories' : 'Daftar Kategori Tersedia'}
            </h2>
            <div className="divide-y divide-[var(--color-border)]/60">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {translateCategoryName(cat.name, lang, cat.nameEn)}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2 mt-0.5">
                      <span className="font-mono">/{cat.slug}</span>
                      <span aria-hidden="true">·</span>
                      <span>ID: {cat.name}</span>
                      {cat.nameEn && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>EN: {cat.nameEn}</span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">#{cat.id}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEditCategory(cat)}
                      className="neu-outset-sm inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                    >
                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{isEn ? 'Edit' : 'Sunting'}</span>
                    </button>

                    {confirmDeleteCategoryId === cat.id ? (
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => void handleDeleteCategory(cat.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[36px]"
                        >
                          {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteCategoryId(null)}
                          className="neu-outset-sm px-2.5 py-1.5 text-xs cursor-pointer min-h-[36px]"
                        >
                          {isEn ? 'Cancel' : 'Batal'}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteCategoryId(cat.id)}
                        className="neu-outset-sm inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[36px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Delete' : 'Hapus'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT HADITH (Shared) */}
      <HadithEditorModal
        open={hadithModalOpen}
        initialHadith={editingHadith}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setHadithModalOpen(false)}
        onSaved={async (msg) => {
          await loadAdminData();
          await onDataChanged();
          showToast(msg);
        }}
      />

      {/* MODAL: CREATE / EDIT ZIKIR (Shared) */}
      <ZikirEditorModal
        open={zikirModalOpen}
        initialZikir={editingZikir}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setZikirModalOpen(false)}
        onSaved={async (msg) => {
          await loadAdminData();
          await onDataChanged();
          showToast(msg);
        }}
      />

      {/* MODAL: CREATE / EDIT SUNNAH GUIDE (Shared) */}
      <SunnahEditorModal
        open={sunnahModalOpen}
        initialItem={editingSunnah}
        defaultStepOrder={sunnahGuides.length + 1}
        authFetch={authFetch}
        onClose={() => setSunnahModalOpen(false)}
        onSaved={async (msg) => {
          await loadAdminData();
          await onDataChanged();
          showToast(msg);
        }}
      />

      {/* MODAL: CREATE / EDIT BLOG (Shared with HTML <section> support & preview) */}
      <BlogEditorModal
        open={blogModalOpen}
        initialPost={editingBlogPost}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setBlogModalOpen(false)}
        onSaved={async (msg) => {
          await loadAdminData();
          await onDataChanged();
          showToast(msg);
        }}
      />

      {/* MODAL: EDIT CATEGORY */}
      {categoryModalOpen && editingCategory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-title"
          onClick={() => setCategoryModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-lg p-6 sm:p-8 my-8 space-y-5"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
              <h2 id="category-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                {isEn ? 'Edit Category' : 'Sunting Kategori'}
              </h2>
              <button
                type="button"
                onClick={() => setCategoryModalOpen(false)}
                aria-label={isEn ? 'Close dialog' : 'Tutup dialog'}
                className="neu-outset-sm p-2 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label htmlFor="edit-cat-name" className="block text-xs font-semibold mb-1.5">
                  {isEn ? 'Category Name (ID) *' : 'Nama Kategori (ID) *'}
                </label>
                <input
                  id="edit-cat-name"
                  type="text"
                  required
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label htmlFor="edit-cat-name-en" className="block text-xs font-semibold mb-1.5">
                  {isEn ? 'English Name (Optional)' : 'Nama Inggris (Opsional)'}
                </label>
                <input
                  id="edit-cat-name-en"
                  type="text"
                  value={editCatNameEn}
                  onChange={(e) => setEditCatNameEn(e.target.value)}
                  className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                />
              </div>

              <div>
                <label htmlFor="edit-cat-slug" className="block text-xs font-semibold mb-1.5">
                  Slug *
                </label>
                <input
                  id="edit-cat-slug"
                  type="text"
                  required
                  value={editCatSlug}
                  onChange={(e) => setEditCatSlug(e.target.value)}
                  className="neu-inset-sm w-full px-3.5 py-2.5 text-sm font-mono focus:outline-none min-h-[42px]"
                />
              </div>

              {categoryModalError && (
                <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                  {categoryModalError}
                </p>
              )}

              <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="neu-outset-sm px-5 py-2.5 text-sm font-medium cursor-pointer min-h-[42px]"
                >
                  {isEn ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  disabled={submittingForm}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer min-h-[42px]"
                >
                  {submittingForm
                    ? isEn
                      ? 'Saving...'
                      : 'Menyimpan...'
                    : isEn
                    ? 'Save Category'
                    : 'Simpan Kategori'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE / EDIT SCHOLAR FIGURE */}
      {figureModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="figure-modal-title"
          onClick={() => setFigureModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-2xl p-6 sm:p-8 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
              <h2 id="figure-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
                {figureForm.id
                  ? isEn
                    ? 'Edit Scholar / Hadith Narrator'
                    : 'Sunting Tokoh / Perawi Hadis'
                  : isEn
                  ? 'Add Scholar / Hadith Narrator'
                  : 'Tambah Tokoh / Perawi Hadis'}
              </h2>
              <button
                type="button"
                onClick={() => setFigureModalOpen(false)}
                aria-label={isEn ? 'Close dialog' : 'Tutup dialog'}
                className="neu-outset-sm p-2 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSaveFigure} className="space-y-4">
              <div className="neu-inset-sm p-3.5 text-xs text-[var(--color-text-secondary)]">
                <strong className="text-[var(--color-text-primary)]">
                  {isEn ? 'Important Note:' : 'Catatan Penting:'}
                </strong>{' '}
                {isEn ? (
                  <>
                    Enter the exact spelling in <strong>Clickable Trigger Name</strong> (e.g.,{' '}
                    <code>Abu Hurairah</code> or <code>Imam An-Nawawi</code>). If there is even a
                    single-character typo, the name in articles/hadiths will not become clickable.
                  </>
                ) : (
                  <>
                    Masukkan ejaan persis pada kolom <strong>Nama Pemicu Klik</strong> (contoh:{' '}
                    <code>Abu Hurairah</code> atau <code>Imam An-Nawawi</code>). Jika ada typo satu
                    huruf pun, nama di artikel/hadis tidak akan bisa diklik.
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-name" className="block text-xs font-semibold mb-1.5">
                    {isEn
                      ? 'Clickable Trigger Name (Exact Text Match) *'
                      : 'Nama Pemicu Klik (Persis di Teks) *'}
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    required
                    value={figureForm.name}
                    onChange={(e) => setFigureForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={isEn ? 'e.g., Abu Hurairah' : 'Contoh: Abu Hurairah'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
                <div>
                  <label htmlFor="f-fullname" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'Full Name / Kunyah / Laqab *' : 'Nama Lengkap / Kunyah / Laqab *'}
                  </label>
                  <input
                    id="f-fullname"
                    type="text"
                    required
                    value={figureForm.fullName}
                    onChange={(e) => setFigureForm((f) => ({ ...f, fullName: e.target.value }))}
                    placeholder={
                      isEn
                        ? 'e.g., Abdurrahman ibn Shakhr Ad-Dausi'
                        : 'Contoh: Abdurrahman bin Shakhr Ad-Dausi'
                    }
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-nasab" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'Lineage & Ancestry (ID)' : 'Jalur Nasab & Silsilah'}
                  </label>
                  <textarea
                    id="f-nasab"
                    rows={2}
                    value={figureForm.nasab}
                    onChange={(e) => setFigureForm((f) => ({ ...f, nasab: e.target.value }))}
                    placeholder={
                      isEn
                        ? 'Full lineage chain up to the tribe or ancestors...'
                        : 'Rangkaian nasab lengkap hingga kabilah atau kakek...'
                    }
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="f-nasab-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Lineage (Optional)' : 'Jalur Nasab Inggris (Opsional)'}
                  </label>
                  <textarea
                    id="f-nasab-en"
                    rows={2}
                    value={figureForm.nasabEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, nasabEn: e.target.value }))}
                    placeholder={isEn ? 'English lineage description...' : 'Deskripsi nasab dalam bahasa Inggris...'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-role" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'Rank in Hadith Science (ID) *' : 'Kedudukan (Ilmu Hadis) *'}
                  </label>
                  <input
                    id="f-role"
                    type="text"
                    required
                    value={figureForm.role}
                    onChange={(e) => setFigureForm((f) => ({ ...f, role: e.target.value }))}
                    placeholder={isEn ? 'Companion of the Prophet / Muhaddith' : 'Sahabat Nabi / Muhaddits'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
                <div>
                  <label htmlFor="f-role-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Rank (Optional)' : 'Kedudukan Inggris (Opsional)'}
                  </label>
                  <input
                    id="f-role-en"
                    type="text"
                    value={figureForm.roleEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, roleEn: e.target.value }))}
                    placeholder={isEn ? 'Companion of the Prophet / Imam of Hadith' : 'Companion / Muhaddith'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-tabaqah" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'Tabaqah / Generation (ID)' : 'Thabaqah / Generasi (ID)'}
                  </label>
                  <input
                    id="f-tabaqah"
                    type="text"
                    value={figureForm.tabaqah}
                    onChange={(e) => setFigureForm((f) => ({ ...f, tabaqah: e.target.value }))}
                    placeholder={isEn ? "Sahabat / Tabi'in / 3rd Century AH" : "Sahabat / Tabi'in / Abad ke-3 H"}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
                <div>
                  <label htmlFor="f-tabaqah-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Tabaqah (Optional)' : 'Thabaqah Inggris (Opsional)'}
                  </label>
                  <input
                    id="f-tabaqah-en"
                    type="text"
                    value={figureForm.tabaqahEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, tabaqahEn: e.target.value }))}
                    placeholder="Companion / 3rd Century AH"
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-birthdeath" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'Birth – Death Years (ID)' : 'Tahun Lahir – Wafat (ID)'}
                  </label>
                  <input
                    id="f-birthdeath"
                    type="text"
                    value={figureForm.birthDeath}
                    onChange={(e) => setFigureForm((f) => ({ ...f, birthDeath: e.target.value }))}
                    placeholder={isEn ? '194 AH – 256 AH' : '194 H – 256 H'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
                <div>
                  <label htmlFor="f-birthdeath-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Birth – Death (Optional)' : 'Tahun Inggris (Opsional)'}
                  </label>
                  <input
                    id="f-birthdeath-en"
                    type="text"
                    value={figureForm.birthDeathEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, birthDeathEn: e.target.value }))}
                    placeholder="194 AH – 256 AH"
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-jarh" className="block text-xs font-semibold mb-1.5">
                    {isEn
                      ? "Hadith Reliability (ID)"
                      : "Penilaian Ilmu Rijal (Jarh wa Ta'dil)"}
                  </label>
                  <textarea
                    id="f-jarh"
                    rows={2}
                    value={figureForm.jarhWaTadil}
                    onChange={(e) => setFigureForm((f) => ({ ...f, jarhWaTadil: e.target.value }))}
                    placeholder={
                      isEn
                        ? 'e.g., Imam Hafizh Tsiqah...'
                        : 'Contoh: Imam Hafizh Tsiqah Tsabt / Shahabi Jalil...'
                    }
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="f-jarh-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Reliability (Optional)' : 'Penilaian Rijal Inggris (Opsional)'}
                  </label>
                  <textarea
                    id="f-jarh-en"
                    rows={2}
                    value={figureForm.jarhWaTadilEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, jarhWaTadilEn: e.target.value }))}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-sanad" className="block text-xs font-semibold mb-1.5">
                    {isEn
                      ? 'Teachers & Students (ID)'
                      : 'Guru, Murid & Jalur Sanad Keilmuan'}
                  </label>
                  <textarea
                    id="f-sanad"
                    rows={2}
                    value={figureForm.teachersAndStudents}
                    onChange={(e) =>
                      setFigureForm((f) => ({ ...f, teachersAndStudents: e.target.value }))
                    }
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="f-sanad-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Teachers & Students (Optional)' : 'Guru & Murid Inggris (Opsional)'}
                  </label>
                  <textarea
                    id="f-sanad-en"
                    rows={2}
                    value={figureForm.teachersAndStudentsEn}
                    onChange={(e) =>
                      setFigureForm((f) => ({ ...f, teachersAndStudentsEn: e.target.value }))
                    }
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-works" className="block text-xs font-semibold mb-1.5">
                    {isEn
                      ? 'Major Works (ID)'
                      : 'Kontribusi Periwayatan & Kitab Karya Utama'}
                  </label>
                  <textarea
                    id="f-works"
                    rows={2}
                    value={figureForm.majorWorks}
                    onChange={(e) => setFigureForm((f) => ({ ...f, majorWorks: e.target.value }))}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="f-works-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Works (Optional)' : 'Kitab Karya Inggris (Opsional)'}
                  </label>
                  <textarea
                    id="f-works-en"
                    rows={2}
                    value={figureForm.majorWorksEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, majorWorksEn: e.target.value }))}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="f-bio" className="block text-xs font-semibold mb-1.5">
                    {isEn
                      ? 'Biography & Hadith Science Notes (ID) *'
                      : 'Biografi & Keterangan Ilmu Hadis *'}
                  </label>
                  <textarea
                    id="f-bio"
                    rows={3}
                    required
                    value={figureForm.biography}
                    onChange={(e) => setFigureForm((f) => ({ ...f, biography: e.target.value }))}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="f-bio-en" className="block text-xs font-semibold mb-1.5">
                    {isEn ? 'English Biography (Optional)' : 'Biografi Inggris (Opsional)'}
                  </label>
                  <textarea
                    id="f-bio-en"
                    rows={3}
                    value={figureForm.biographyEn}
                    onChange={(e) => setFigureForm((f) => ({ ...f, biographyEn: e.target.value }))}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <label className="inline-flex items-center gap-2.5 text-sm font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={figureForm.isPublished}
                  onChange={(e) => setFigureForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="w-4 h-4 accent-primary-600"
                />
                <span>
                  {isEn
                    ? 'Activate this name so it becomes clickable across the site'
                    : 'Aktifkan nama ini agar dapat diklik di seluruh website'}
                </span>
              </label>

              {figureModalError && (
                <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
                  {figureModalError}
                </p>
              )}

              <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setFigureModalOpen(false)}
                  className="neu-outset-sm px-5 py-2.5 text-sm font-medium cursor-pointer min-h-[42px]"
                >
                  {isEn ? 'Cancel' : 'Batal'}
                </button>
                <button
                  type="submit"
                  disabled={submittingForm}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer min-h-[42px]"
                >
                  {submittingForm
                    ? isEn
                      ? 'Saving...'
                      : 'Menyimpan...'
                    : isEn
                    ? 'Save Scholar'
                    : 'Simpan Tokoh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
