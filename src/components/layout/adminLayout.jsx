import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  FaHome, 
  FaUser, 
  FaBox, 
  FaPlusCircle, 
  FaShoppingCart, 
  FaSignOutAlt, 
  FaClock,
  FaUserCircle,
  FaRegChartBar,
  FaCircle,
  FaExclamationTriangle 
} from 'react-icons/fa';

const AdminLayout = () => {
  const [time, setTime] = useState(new Date());
  const [adminName, setAdminName] = useState('Majesty'); // You can fetch this from your auth system

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="admin-layout d-flex flex-column vh-100  px-2  py-2  " >
      {/* Header */}
      <header className=" text-white p-3 d-flex justify-content-between align-items-center btn-2"  
     >
        <h2 className="mb-0  ">
          <FaUserCircle className="me-2" />
          Admin Panel
        </h2>
        <div className="d-flex align-items-center">
          <div className="online-status me-3 d-flex align-items-center">
            <FaCircle className="text-success me-2" style={{ fontSize: '0.8rem' }} />
            <span>{adminName} - Online</span>
          </div>
          <FaClock className="me-2" />
       
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside className=" text-white p-3" style={{ width: '250px'   }}>
          <div className="mb-4 d-flex align-items-center  btn-2">
            <FaUserCircle className="me-2" size={24} />
            <div>
              <div className="fw-bold">{adminName}</div>
              <div className="d-flex align-items-center text-success">
                <FaCircle className="me-1" style={{ fontSize: '0.6rem' }} />
                <small>Online</small>
              </div>
            </div>
          </div>

          <nav className="d-flex flex-column gap-3  btn-2 ">
            <Link to="/admin/dashboard" className="text-white text-decoration-none d-flex align-items-center">
              <FaHome className="me-2" />
              Dashboard
            </Link>
            
            <Link to="/admin/users" className="text-white text-decoration-none d-flex align-items-center">
              <FaUser className="me-2" />
              Users
            </Link>

            <Link to="/admin/products" className="text-white text-decoration-none d-flex align-items-center">
              <FaBox className="me-2" />
              Products
            </Link>

            <Link to="/admin/products/createproduct" className="text-white text-decoration-none d-flex align-items-center">
              <FaPlusCircle className="me-2" />
              Create Product
            </Link>

            <Link to="/admin/orders" className="text-white text-decoration-none d-flex align-items-center">
              <FaShoppingCart className="me-2" />
              Orders
            </Link>

            <Link to="https://analytics.google.com/analytics/web/#/p479202771/reports/intelligenthome" className="text-white text-decoration-none d-flex align-items-center">
              <FaRegChartBar className="me-2" />
              Analytics
            </Link>

            <div className="mt-auto">
              <Link to="/admin/logout" className="text-white text-decoration-none d-flex align-items-center">
                <FaSignOutAlt className="me-2" />
                Log Out
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-4 flex-grow-1 bg-light">
          <Outlet />
        </main>
      </div>

     {/* Footer */}
<footer className="btn-2 px-2 py-2 text-white p-2 d-flex justify-content-between align-items-center">
  <div className="d-flex align-items-center">
    <span className="me-3">© 2025 majesty Admin Panel</span>

    
    {/* Security Warning */}
    <div className="d-flex align-items-center text-warning p-4">
      <FaExclamationTriangle className="me-2" />
      <small>
        Security Notice: In case of data breaches or vulnerabilities, 
        contact Welt Tallis: +254 740 045355
      </small>
    </div>
  </div>

  <div className="d-flex align-items-center">
    <FaClock className="me-2" />
    <span>{time.toLocaleTimeString()}</span>
  </div>
</footer>
    </div>
  );
};

export default AdminLayout;