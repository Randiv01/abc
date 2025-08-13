import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Button from '../Components/P-Button.jsx';
import Modal from '../Components/Modal.jsx';
import { Plus, FileDown, Edit, Trash, Check, Download } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Productivity.css';
const Productivity = () => {
  const {
    t
  } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  // Sample data for harvest records
  const harvestRecords = [{
    id: 1,
    plantType: 'Tomato',
    greenhouseNo: 'GH-01',
    harvestDate: '2023-07-10',
    quantity: 120,
    qualityGrade: 'A',
    worker: 'John Doe'
  }, {
    id: 2,
    plantType: 'Cucumber',
    greenhouseNo: 'GH-02',
    harvestDate: '2023-07-12',
    quantity: 85,
    qualityGrade: 'B',
    worker: 'Jane Smith'
  }, {
    id: 3,
    plantType: 'Lettuce',
    greenhouseNo: 'GH-03',
    harvestDate: '2023-07-15',
    quantity: 60,
    qualityGrade: 'A',
    worker: 'Mike Johnson'
  }, {
    id: 4,
    plantType: 'Strawberry',
    greenhouseNo: 'GH-04',
    harvestDate: '2023-07-18',
    quantity: 40,
    qualityGrade: 'A',
    worker: 'Sarah Williams'
  }, {
    id: 5,
    plantType: 'Chili',
    greenhouseNo: 'GH-05',
    harvestDate: '2023-07-20',
    quantity: 30,
    qualityGrade: 'C',
    worker: 'David Brown'
  }];
  // Sample data for charts
  const harvestByPlantData = [{
    plantType: 'Tomato',
    quantity: 320
  }, {
    plantType: 'Cucumber',
    quantity: 210
  }, {
    plantType: 'Lettuce',
    quantity: 180
  }, {
    plantType: 'Strawberry',
    quantity: 150
  }, {
    plantType: 'Chili',
    quantity: 90
  }];
  const monthlyYieldData = [{
    month: 'Jan',
    yield: 420
  }, {
    month: 'Feb',
    yield: 380
  }, {
    month: 'Mar',
    yield: 450
  }, {
    month: 'Apr',
    yield: 520
  }, {
    month: 'May',
    yield: 580
  }, {
    month: 'Jun',
    yield: 620
  }, {
    month: 'Jul',
    yield: 710
  }];
  const getQualityGradeClass = grade => {
    switch (grade) {
      case 'A':
        return 'grade-a';
      case 'B':
        return 'grade-b';
      case 'C':
        return 'grade-c';
      default:
        return '';
    }
  };
  const handleAddRecord = () => {
    setShowModal(true);
  };
  return <div className="productivity">
      <div className="productivity-header">
        <h1>Productivity</h1>
        <div className="header-actions">
          <Button variant="secondary" icon={<FileDown size={16} />} onClick={() => console.log('Export Reports')}>
            Export Reports
          </Button>
          <Button icon={<Plus size={16} />} onClick={handleAddRecord}>
            Add Harvest Record
          </Button>
        </div>
      </div>
      <div className="charts-section">
        <div className="chart-container">
          <h3>Harvest by Plant Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={harvestByPlantData} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plantType" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" name="Quantity (kg)" fill="#2E7D32" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Monthly Yield</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyYieldData} margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10
          }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="yield" name="Yield (kg)" stroke="#66BB6A" activeDot={{
              r: 8
            }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="harvest-table-container">
        <div className="table-header">
          <h2>Harvest Records</h2>
          <div className="table-actions">
            <Button variant="secondary" size="small" icon={<FileDown size={14} />} onClick={() => console.log('Export Table')}>
              Export CSV
            </Button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="harvest-table">
            <thead>
              <tr>
                <th>Plant Type</th>
                <th>Greenhouse No</th>
                <th>Harvest Date</th>
                <th>Quantity (kg)</th>
                <th>Quality Grade</th>
                <th>Worker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {harvestRecords.map(record => <tr key={record.id}>
                  <td>{record.plantType}</td>
                  <td>{record.greenhouseNo}</td>
                  <td>{record.harvestDate}</td>
                  <td>{record.quantity}</td>
                  <td>
                    <span className={`quality-grade ${getQualityGradeClass(record.qualityGrade)}`}>
                      {record.qualityGrade}
                    </span>
                  </td>
                  <td>{record.worker}</td>
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
      {showModal && <Modal title="Add Harvest Record" onClose={() => setShowModal(false)}>
          <form className="add-harvest-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="plantType">Plant Type</label>
                <input type="text" id="plantType" name="plantType" required />
              </div>
              <div className="form-group">
                <label htmlFor="greenhouseNo">Greenhouse No</label>
                <input type="text" id="greenhouseNo" name="greenhouseNo" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="harvestDate">Harvest Date</label>
                <input type="date" id="harvestDate" name="harvestDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity (kg)</label>
                <input type="number" id="quantity" name="quantity" min="0" step="0.1" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="qualityGrade">Quality Grade</label>
                <select id="qualityGrade" name="qualityGrade" required>
                  <option value="">Select Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="worker">Worker</label>
                <input type="text" id="worker" name="worker" required />
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
export default Productivity;