import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDrawer from './components/CartDrawer';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCart } from './components/context/CartContext.jsx';
import axios from 'axios';
import logoImg from './assets/nr.png';
import Myorders from './Myorders.jsx';
// Firebase
import { auth } from './firebase.js';
import { signOut } from 'firebase/auth';
import NoPersonIcon from '@mui/icons-material/PersonOutline';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '25px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    boxShadow: `0 0 8px ${alpha(theme.palette.common.white, 0.2)}`,
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '300px',
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '150px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  transition: 'all 0.3s ease',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: alpha(theme.palette.common.white, 0.7),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '12px 12px 12px 45px',
    transition: theme.transitions.create(['width', 'background-color']),
    width: '100%',
    fontSize: '0.95rem',
    '&::placeholder': {
      color: alpha(theme.palette.common.white, 0.7),
      opacity: 1,
    },
    '&:focus': {
      '&::placeholder': {
        opacity: 0.8,
      },
    },
    [theme.breakpoints.down('sm')]: {
      padding: '8px 8px 8px 40px',
      fontSize: '0.9rem',
    },
  },
}));

const SearchResults = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  maxHeight: '300px',
  overflowY: 'auto',
  zIndex: 1000,
  marginTop: '4px',
  '&:focus-within': {
    outline: 'none',
  },
}));

const SearchResultItem = styled('div')(({ theme }) => ({
  padding: '12px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  userSelect: 'none',
}));

const pages = ['Products', 'Categories', 'Blog'];
// Temporary: Category dropdown options


const categoryOptions = [
  { label: 'AC', value: 'ac' },
  { label: 'Washing Machine', value: 'washingmachine' },
  { label: 'TV', value: 'tv' },
];
// Temporary: Blog dropdown options
const blogOptions = [
  { label: 'coming soon', value: '' },
];
const settings = ['Profile', 'Logout','My Orders'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const [anchorElCategories, setAnchorElCategories] = React.useState(null);
  const [anchorElBlog, setAnchorElBlog] = React.useState(null);
  const navigate = useNavigate();
  const { isCartOpen, toggleCart, cartItems } = useCart();
  const [profilePic, setProfilePic] = React.useState(null);

  React.useEffect(() => {
    const user = auth.currentUser;
    if (user && user.photoURL) {
      setProfilePic(user.photoURL);
    } else {
      setProfilePic(null);
    }
  }, []);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setShowResults(true);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Function to safely fetch data with error handling
    const safeSearch = async (endpoint, category) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${endpoint}-search?q=${encodeURIComponent(query)}`);
        return response.data.map(item => ({ ...item, category }));
      } catch (error) {
        console.error(`${category} search error:`, error);
        return [];
      }
    };

    try {
      // Test the basic endpoint first to check if API is responding
      const testResponse = await axios.get(`http://localhost:3000/test-search?q=${encodeURIComponent(query)}`);
      // console.log("Test search response:", testResponse.data);

      // Use Promise.allSettled to prevent one failed request from affecting others
      const [machineResults, acResults, tvResults] = await Promise.all([
        safeSearch('machine', 'machine'),
        safeSearch('ac', 'ac'),
        safeSearch('tv', 'tv')
      ]);
      
      // Combine all results
      const combinedResults = [
        ...machineResults,
        ...acResults,
        ...tvResults
      ];
      
      setSearchResults(combinedResults);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  // Handle search form submission when user presses Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with query parameter
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
    }
  };

  // Create a direct navigation function
  const navigateToProduct = (categoryType, productId) => {
    let route;
    
    // Map the categories to their correct route paths
    switch (categoryType) {
      case 'machine':
        route = 'machine';
        break;
      case 'tv':
        route = 'tv';
        break;
      case 'ac':
        route = 'ac';
        break;
      default:
        route = categoryType;
    }
    
    // console.log(`Direct navigation to: /${route}/${productId}`);
    window.location.href = `/${route}/${productId}`;
  };

  const handleSearchSelect = (product) => {
    if (product) {
      // console.log("Search item selected:", product);
      try {
        // Use direct navigation to avoid React Router issues
        navigateToProduct(product.category, product._id);
        
        // Clear search state
        setSearchQuery('');
        setSearchResults([]);
        setShowResults(false);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    if (setting === 'Logout') {
      signOut(auth)
        .then(() => {
          console.log('User logged out');
          navigate('/signup');
        })
        .catch((error) => {
          console.error('Logout error:', error);
        });
      handleCloseUserMenu();
      return;
    }
    if (setting === 'Profile') {
      navigate('/profile');
      handleCloseUserMenu();
      return;
    }
     if (setting === 'My Orders') {
      navigate('/Myorders');
      handleCloseUserMenu();
      return;
    }
    handleCloseUserMenu();
  };

  // Temporary: Handlers for Categories dropdown
  const handleOpenCategoriesMenu = (event) => {
    setAnchorElCategories(event.currentTarget);
  };
  const handleCloseCategoriesMenu = () => {
    setAnchorElCategories(null);
  };

  // Temporary: Handlers for Blog dropdown
  const handleOpenBlogMenu = (event) => {
    setAnchorElBlog(event.currentTarget);
  };
  const handleCloseBlogMenu = () => {
    setAnchorElBlog(null);
  };

  // Add a click handler to close the dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showResults) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showResults]);

  return (
    <AppBar position="static" className="hello">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Box sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%',marginTop: '5px',zIndex: '2000 !important'  }} />
            </Box>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* Temporary: Categories and Blog dropdown for mobile */}
              {pages.map((page) =>
                page === 'Categories' ? (
                  <React.Fragment key={page}>
                    <MenuItem onClick={handleOpenCategoriesMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                    <Menu
                      anchorEl={anchorElCategories}
                      open={Boolean(anchorElCategories)}
                      onClose={() => {
                        handleCloseCategoriesMenu();
                        handleCloseNavMenu();
                      }}
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          onClick={() => {
                            navigate(`/${option.value}`);
                            handleCloseCategoriesMenu();
                            handleCloseNavMenu();
                          }}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                ) : page === 'Blog' ? (
                  <React.Fragment key={page}>
                    <MenuItem onClick={handleOpenBlogMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                    <Menu
                      anchorEl={anchorElBlog}
                      open={Boolean(anchorElBlog)}
                      onClose={() => {
                        handleCloseBlogMenu();
                        handleCloseNavMenu();
                      }}
                    >
                      {blogOptions.map((option) => (
                        <MenuItem key={option.label} disabled>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </React.Fragment>
                ) : page === 'Products' ? (
                  <MenuItem key={page} onClick={() => {
                    if (window.location.pathname === '/') {
                      const el = document.getElementById('first-category');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#first-category');
                    }
                  }}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1
            }}>
              <img src={logoImg} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </Box>
          </Box>

          {/* Pages - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {/* Temporary: Categories and Blog dropdown for desktop */}
            {pages.map((page) =>
              page === 'Categories' ? (
                <React.Fragment key={page}>
                  <Button
                    onClick={handleOpenCategoriesMenu}
                    sx={{ my: 2, color: 'white', fontWeight: 600 }}
                  >
                    {page.toUpperCase()}
                  </Button>
                  <Menu
                    anchorEl={anchorElCategories}
                    open={Boolean(anchorElCategories)}
                    onClose={handleCloseCategoriesMenu}
                  >
                    {categoryOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={() => {
                          navigate(`/${option.value}`);
                          handleCloseCategoriesMenu();
                        }}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ) : page === 'Blog' ? (
                <React.Fragment key={page}>
                  <Button
                    onClick={handleOpenBlogMenu}
                    sx={{ my: 2, color: 'white', fontWeight: 600 }}
                  >
                    {page.toUpperCase()}
                  </Button>
                  <Menu
                    anchorEl={anchorElBlog}
                    open={Boolean(anchorElBlog)}
                    onClose={handleCloseBlogMenu}
                  >
                    {blogOptions.map((option) => (
                      <MenuItem key={option.label} disabled>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </React.Fragment>
              ) : page === 'Products' ? (
                <Button
                  key={page}
                  onClick={() => {
                    if (window.location.pathname === '/') {
                      const el = document.getElementById('first-category');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/#first-category');
                    }
                  }}
                  sx={{ my: 2, color: 'white', fontWeight: 600 }}
                >
                  {page.toUpperCase()}
                </Button>
              ) : (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', fontWeight: 600 }}
                >
                  {page.toUpperCase()}
                </Button>
              )
            )}
          </Box>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setShowResults(true)}
                aria-label="Search products"
              />
              {showResults && (
                <SearchResults 
                  role="listbox" 
                  aria-label="Search results"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <SearchResultItem
                        key={`${result.category}-${result._id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("Item clicked:", result);
                          setShowResults(false);
                          setTimeout(() => {
                            handleSearchSelect(result);
                          }, 10);
                        }}
                        role="option"
                        tabIndex={0}
                      >
                        <a 
                          href={`/${result.category === 'machine' ? 'machine' : result.category}/${result._id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowResults(false);
                            setTimeout(() => {
                              handleSearchSelect(result);
                            }, 10);
                          }}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            textDecoration: 'none', 
                            color: 'inherit',
                            width: '100%',
                            cursor: 'pointer'
                          }}
                        >
                          <img
                            src={`http://localhost:3000${result.image}`}
                            alt={result.title}
                            style={{ width: '40px', height: '40px', objectFit: 'cover',borderRadius: '50%' }}
                          />
                          <div>
                            <Typography variant="body1" sx={{ color: '#1976d2', fontWeight: 500 }}>
                              {result.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {result.category.toUpperCase()} - ₹{result.newprice}
                            </Typography>
                          </div>
                        </a>
                      </SearchResultItem>
                    ))
                  ) : (
                    <SearchResultItem>
                      <Typography variant="body2" color="text.secondary">
                        No results found
                      </Typography>
                    </SearchResultItem>
                  )}
                </SearchResults>
              )}
            </Search>
          </form>

          {/* Right: Cart + Avatar */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: -22 }}>
            <IconButton 
              onClick={toggleCart}
              sx={{ color: 'white', marginLeft: '-30px' }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profilePic ? (
                  <Avatar src={profilePic} sx={{ bgcolor: 'grey.400', color: 'white', fontWeight: 'bold' }} />
                ) : (
                  <Avatar sx={{ bgcolor: 'grey.400', color: 'white', fontWeight: 'bold' }}>
                    <NoPersonIcon />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={toggleCart}
      />
    </AppBar>
  );
}

export default ResponsiveAppBar;