import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Button from '../Components/P-Button.jsx';
import Modal from '../Components/P-Modal.jsx';
import { Plus, FileDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Edit, Trash, Download, Check, Upload, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/P-InspectionManagement.css';
const InspectionManagement = () => {
  const {
    t
  } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // Sample data for calendar
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = [];
    // Add empty days for the start of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({
        day: null,
        hasInspection: false
      });
    }
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      // Randomly assign inspections to some days
      const hasInspection = Math.random() > 0.7;
      days.push({
        day: i,
        hasInspection
      });
    }
    return days;
  };
  const calendarDays = generateCalendarDays();
  // Sample data for inspections
  const inspections = [{
    id: 1,
    greenhouseNo: 'GH-01',
    inspectionDate: '2023-07-10',
    inspector: 'John Doe',
    status: 'Cleared',
    notes: 'All plants healthy, optimal growth observed.'
  }, {
    id: 2,
    greenhouseNo: 'GH-02',
    inspectionDate: '2023-07-12',
    inspector: 'Jane Smith',
    status: 'Issue',
    notes: 'Found signs of aphid infestation on tomato plants.'
  }, {
    id: 3,
    greenhouseNo: 'GH-03',
    inspectionDate: '2023-07-15',
    inspector: 'Mike Johnson',
    status: 'Cleared',
    notes: 'Good moisture levels, plants developing well.'
  }, {
    id: 4,
    greenhouseNo: 'GH-04',
    inspectionDate: '2023-07-18',
    inspector: 'Sarah Williams',
    status: 'Issue',
    notes: 'Some yellowing in cucumber leaves, possible nutrient deficiency.'
  }, {
    id: 5,
    greenhouseNo: 'GH-05',
    inspectionDate: '2023-07-20',
    inspector: 'David Brown',
    status: 'Cleared',
    notes: 'Harvesting ready to begin in approximately one week.'
  }];
  // Sample data for charts
  const inspectionStatusData = [{
    name: 'Cleared',
    value: 18
  }, {
    name: 'Issue',
    value: 7
  }];
  const issuesByGreenhouseData = [{
    greenhouseNo: 'GH-01',
    count: 1
  }, {
    greenhouseNo: 'GH-02',
    count: 3
  }, {
    greenhouseNo: 'GH-03',
    count: 0
  }, {
    greenhouseNo: 'GH-04',
    count: 2
  }, {
    greenhouseNo: 'GH-05',
    count: 1
  }];
  const COLORS = ['#66BB6A', '#EF5350'];
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  const handleDateClick = day => {
    if (day) {
      setSelectedDate(day);
    }
  };
  const getMonthName = date => {
    return date.toLocaleString('default', {
      month: 'long'
    }) + ' ' + date.getFullYear();
  };
  const getStatusClass = status => {
    return status.toLowerCase() === 'cleared' ? 'status-cleared' : 'status-issue';
  };
  return <div className="inspection-management">
      <div className="inspection-header">
        <h1>Inspection Management</h1>
        <div className="header-actions">
          <Button variant="secondary" icon={<FileDown size={16} />} onClick={() => console.log('Export Reports')}>
            Export Reports
          </Button>
          <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
            New Inspection
          </Button>
        </div>
      </div>
      <div className="dashboard-top">
        <div className="calendar-section">
          <div className="calendar-header">
            <h2>Inspection Schedule</h2>
            <div className="calendar-navigation">
              <button onClick={handlePrevMonth}>
                <ChevronLeft size={16} />
                Prev
              </button>
              <span>{getMonthName(currentMonth)}</span>
              <button onClick={handleNextMonth}>
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            <div className="calendar-weekdays">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="calendar-days">
              {calendarDays.map((day, index) => <div key={index} className={`calendar-day ${!day.day ? 'empty' : ''} ${day.hasInspection ? 'has-inspection' : ''} ${selectedDate === day.day ? 'selected' : ''}`} onClick={() => handleDateClick(day.day)}>
                  {day.day}
                  {day.hasInspection && <div className="inspection-indicator"></div>}
                </div>)}
            </div>
          </div>
        </div>
        <div className="charts-section">
          <div className="chart-container">
            <h3>Inspection Status Overview</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={inspectionStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {inspectionStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3>Issues by Greenhouse</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={issuesByGreenhouseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="greenhouseNo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#EF5350" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="inspection-table-container">
        <div className="table-header">
          <h2>Inspection Records</h2>
          <div className="table-actions">
            <select className="date-filter">
              <option value="all">All Dates</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="column-toggle">
              <Filter size={14} />
              Columns
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="inspection-table">
            <thead>
              <tr>
                <th>Greenhouse No</th>
                <th>Date</th>
                <th>Inspector</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map(inspection => <tr key={inspection.id}>
                  <td>{inspection.greenhouseNo}</td>
                  <td>{inspection.inspectionDate}</td>
                  <td>{inspection.inspector}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(inspection.status)}`}>
                      {inspection.status}
                    </span>
                  </td>
                  <td>{inspection.notes}</td>
                  <td className="action-buttons">
                    <button className="action-button edit" onClick={() => console.log('Edit inspection', inspection.id)}>
                      <Edit size={16} />
                    </button>
                    <button className="action-button delete" onClick={() => console.log('Delete inspection', inspection.id)}>
                      <Trash size={16} />
                    </button>
                    <button className="action-button download" onClick={() => console.log('Download PDF', inspection.id)}>
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
      {showModal && <Modal title="New Inspection" onClose={() => setShowModal(false)}>
          <form className="add-inspection-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="greenhouseNo">Greenhouse No</label>
                <input type="text" id="greenhouseNo" name="greenhouseNo" required />
              </div>
              <div className="form-group">
                <label htmlFor="inspectionDate">Inspection Date</label>
                <input type="date" id="inspectionDate" name="inspectionDate" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inspector">Inspector</label>
                <input type="text" id="inspector" name="inspector" required />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" required>
                  <option value="Cleared">Cleared</option>
                  <option value="Issue">Issue</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea id="notes" name="notes" rows="4" required></textarea>
            </div>
            {/* Issue reporting section, shown only when status is "Issue" */}
            <div className="issue-upload">
              <h4>Issue Details (if any)</h4>
              <textarea placeholder="Describe the issue in detail..." rows="3"></textarea>
              <div className="form-group">
                <label htmlFor="issueImage">Upload Image (Optional)</label>
                <div className="file-input">
                  <input type="file" id="issueImage" name="issueImage" accept="image/*" />
                  <label htmlFor="issueImage">Choose File</label>
                </div>
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
export default InspectionManagement;