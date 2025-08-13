import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Button from '../Components/P-Button.jsx';
import Modal from '../Components/P-Modal.jsx';
import { Plus, FileDown, Edit, Trash, Check, Download, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/FertilizingManagement.css';
const FertilizingManagement = () => {
  const {
    t
  } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [selectedGreenhouse, setSelectedGreenhouse] = useState('all');
  const [selectedFertilizer, setSelectedFertilizer] = useState('all');
  // Sample data for fertilizing records
  const fertilizingRecords = [{
    id: 1,
    greenhouseNo: 'GH-01',
    date: '2023-07-10',
    fertilizerType: 'Urea',
    quantity: 5,
    staff: 'John Doe',
    status: 'Treated'
  }, {
    id: 2,
    greenhouseNo: 'GH-02',
    date: '2023-07-12',
    fertilizerType: 'NPK',
    quantity: 8,
    staff: 'Jane Smith',
    status: 'Untreated'
  }, {
    id: 3,
    greenhouseNo: 'GH-03',
    date: '2023-07-15',
    fertilizerType: 'Compost',
    quantity: 12,
    staff: 'Mike Johnson',
    status: 'Treated'
  }, {
    id: 4,
    greenhouseNo: 'GH-04',
    date: '2023-07-18',
    fertilizerType: 'Organic',
    quantity: 7,
    staff: 'Sarah Williams',
    status: 'Treated'
  }, {
    id: 5,
    greenhouseNo: 'GH-05',
    date: '2023-07-20',
    fertilizerType: 'Urea',
    quantity: 4,
    staff: 'David Brown',
    status: 'Untreated'
  }];
  // Sample data for charts
  const fertilizerTypeData = [{
    name: 'Urea',
    value: 9
  }, {
    name: 'NPK',
    value: 8
  }, {
    name: 'Compost',
    value: 12
  }, {
    name: 'Organic',
    value: 7
  }];
  const fertilizingFrequencyData = [{
    greenhouseNo: 'GH-01',
    frequency: 4
  }, {
    greenhouseNo: 'GH-02',
    frequency: 3
  }, {
    greenhouseNo: 'GH-03',
    frequency: 5
  }, {
    greenhouseNo: 'GH-04',
    frequency: 2
  }, {
    greenhouseNo: 'GH-05',
    frequency: 3
  }];
  const COLORS = ['#43A047', '#66BB6A', '#81C784', '#A5D6A7'];
  const getStatusClass = status => {
    return status.toLowerCase() === 'treated' ? 'status-treated' : 'status-untreated';
  };
  const handleDateRangeChange = e => {
    const {
      name,
      value
    } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleGreenhouseChange = e => {
    setSelectedGreenhouse(e.target.value);
  };
  const handleFertilizerChange = e => {
    setSelectedFertilizer(e.target.value);
  };
  const handleAddRecord = () => {
    setShowModal(true);
  };
  return <div className="fertilizing-management">
      <div className="fertilizing-header">
        <h1>{t('fertilizingManagement')}</h1>
        <div className="header-actions">
          <Button variant="secondary" icon={<FileDown size={16} />} onClick={() => console.log('Export Reports')}>
            Export Reports
          </Button>
          <Button icon={<Plus size={16} />} onClick={handleAddRecord}>
            New Record
          </Button>
        </div>
      </div>
      <div className="charts-section">
        <div className="chart-container">
          <h3>Fertilizer Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={fertilizerTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
              name,
              percent
            }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {fertilizerTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Fertilizing Frequency by Greenhouse</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fertilizingFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="greenhouseNo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency" fill="#2E7D32" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="filter-section">
        <div className="filter-group">
          <label>Date Range:</label>
          <div className="date-range">
            <input type="date" name="start" value={dateRange.start} onChange={handleDateRangeChange} />
            <span>to</span>
            <input type="date" name="end" value={dateRange.end} onChange={handleDateRangeChange} />
          </div>
        </div>
        <div className="filter-group">
          <label>Greenhouse:</label>
          <select value={selectedGreenhouse} onChange={handleGreenhouseChange}>
            <option value="all">All Greenhouses</option>
            <option value="GH-01">GH-01</option>
            <option value="GH-02">GH-02</option>
            <option value="GH-03">GH-03</option>
            <option value="GH-04">GH-04</option>
            <option value="GH-05">GH-05</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Fertilizer Type:</label>
          <select value={selectedFertilizer} onChange={handleFertilizerChange}>
            <option value="all">All Types</option>
            <option value="Urea">Urea</option>
            <option value="NPK">NPK</option>
            <option value="Compost">Compost</option>
            <option value="Organic">Organic</option>
          </select>
        </div>
        <Button variant="secondary" onClick={() => console.log('Apply filters')}>
          Apply Filters
        </Button>
      </div>
      <div className="fertilizing-table-container">
        <div className="table-header">
          <h2>Fertilizing Records</h2>
          <div className="table-actions">
            <Button variant="secondary" size="small" icon={<FileDown size={14} />} onClick={() => console.log('Export Table')}>
              Export CSV
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="fertilizing-table">
            <thead>
              <tr>
                <th>Greenhouse No</th>
                <th>Date</th>
                <th>Fertilizer Type</th>
                <th>Quantity (kg)</th>
                <th>Staff</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fertilizingRecords.map(record => <tr key={record.id}>
                  <td>{record.greenhouseNo}</td>
                  <td>{record.date}</td>
                  <td>{record.fertilizerType}</td>
                  <td>{record.quantity}</td>
                  <td>{record.staff}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button className="action-button edit" onClick={() => console.log('Edit record', record.id)}>
                      <Edit size={16} />
                    </button>
                    <button className="action-button delete" onClick={() => console.log('Delete record', record.id)}>
                      <Trash size={16} />
                    </button>
                    <button className="action-button download" onClick={() => console.log('Download PDF', record.id)}>
                      <Download size={16} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button disabled>Previous</button>
          <span>Page 1 of 1</span>
          <button disabled>Next</button>
        </div>
      </div>
      {showModal && <Modal title="Add Fertilizing Record" onClose={() => setShowModal(false)}>
          <form className="add-fertilizing-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="greenhouseNo">Greenhouse No</label>
                <input type="text" id="greenhouseNo" name="greenhouseNo" required />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fertilizerType">Fertilizer Type</label>
                <select id="fertilizerType" name="fertilizerType" required>
                  <option value="">Select Type</option>
                  <option value="Urea">Urea</option>
                  <option value="NPK">NPK</option>
                  <option value="Compost">Compost</option>
                  <option value="Organic">Organic</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity (kg)</label>
                <input type="number" id="quantity" name="quantity" min="0" step="0.1" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="staff">Staff</label>
                <input type="text" id="staff" name="staff" required />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" required>
                  <option value="Treated">Treated</option>
                  <option value="Untreated">Untreated</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button type="submit" icon={<Check size={16} />} onClick={e => {
            e.preventDefault();
            console.log('Form submitted');
            setShowModal(false);
          }}>
                Submit
              </Button>
            </div>
          </form>
        </Modal>}
    </div>;
};
export default FertilizingManagement;