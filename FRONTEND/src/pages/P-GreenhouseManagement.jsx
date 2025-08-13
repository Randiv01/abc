import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';
import Card from '../Components/P-Card.jsx';
import Button from '../Components/P-Button.jsx';
import Modal from '../Components/P-Modal.jsx';
import { Plus, Search, Edit, Trash, X, Check, ChevronDown, ChevronUp, Upload } from 'lucide-react';
import '../styles/P-GreenhouseManagement.css';
const GreenhouseManagement = () => {
  const {
    t
  } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPlant, setExpandedPlant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // Sample data for plants
  const plants = {
    vegetables: [{
      id: 'v1',
      name: 'Chili',
      category: 'Vegetable',
      plantedDate: '2023-05-01',
      expectedHarvest: '2023-08-15',
      estimatedYield: '45',
      greenhouseId: 'GH-01',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'v2',
      name: 'Tomato',
      category: 'Vegetable',
      plantedDate: '2023-05-05',
      expectedHarvest: '2023-07-30',
      estimatedYield: '120',
      greenhouseId: 'GH-02',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'v3',
      name: 'Cucumber',
      category: 'Vegetable',
      plantedDate: '2023-05-10',
      expectedHarvest: '2023-07-20',
      estimatedYield: '90',
      greenhouseId: 'GH-03',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'v4',
      name: 'Eggplant',
      category: 'Vegetable',
      plantedDate: '2023-05-15',
      expectedHarvest: '2023-08-05',
      estimatedYield: '75',
      greenhouseId: 'GH-04',
      status: 'Maintenance',
      image: 'https://images.unsplash.com/photo-1635342219731-4ae827e2e2b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'v5',
      name: 'Lettuce',
      category: 'Vegetable',
      plantedDate: '2023-05-20',
      expectedHarvest: '2023-07-10',
      estimatedYield: '60',
      greenhouseId: 'GH-05',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }],
    fruits: [{
      id: 'f1',
      name: 'Strawberry',
      category: 'Fruit',
      plantedDate: '2023-04-01',
      expectedHarvest: '2023-07-15',
      estimatedYield: '30',
      greenhouseId: 'GH-06',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'f2',
      name: 'Cherry',
      category: 'Fruit',
      plantedDate: '2023-04-05',
      expectedHarvest: '2023-07-30',
      estimatedYield: '25',
      greenhouseId: 'GH-07',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1528821128474-25c5c5a928f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'f3',
      name: 'Banana',
      category: 'Fruit',
      plantedDate: '2023-04-10',
      expectedHarvest: '2023-09-20',
      estimatedYield: '150',
      greenhouseId: 'GH-08',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'f4',
      name: 'Papaya',
      category: 'Fruit',
      plantedDate: '2023-04-15',
      expectedHarvest: '2023-10-05',
      estimatedYield: '80',
      greenhouseId: 'GH-09',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }, {
      id: 'f5',
      name: 'Mango',
      category: 'Fruit',
      plantedDate: '2023-04-20',
      expectedHarvest: '2023-09-10',
      estimatedYield: '60',
      greenhouseId: 'GH-10',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1605027990121-cbae9e0def45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }]
  };
  const filteredPlants = {
    vegetables: plants.vegetables.filter(plant => (category === 'all' || category === 'vegetable') && plant.name.toLowerCase().includes(searchQuery.toLowerCase())),
    fruits: plants.fruits.filter(plant => (category === 'all' || category === 'fruit') && plant.name.toLowerCase().includes(searchQuery.toLowerCase()))
  };
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCategoryChange = e => {
    setCategory(e.target.value);
  };
  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };
  const togglePlantDetails = plantId => {
    setExpandedPlant(expandedPlant === plantId ? null : plantId);
  };
  const getStatusClass = status => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'maintenance':
        return 'status-maintenance';
      default:
        return '';
    }
  };
  // Combined plants for horizontal display when category is selected
  const combinedPlants = [...filteredPlants.vegetables, ...filteredPlants.fruits];
  return <div className="greenhouse-management">
      <div className="greenhouse-header">
        <h1>{t('greenhouseManagement')}</h1>
        <Button icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
          {t('addGreenhouse')}
        </Button>
      </div>
      <div className="filter-section">
        <div className="category-filter">
          <select value={category} onChange={handleCategoryChange}>
            <option value="all">{t('all')}</option>
            <option value="vegetable">{t('vegetables')}</option>
            <option value="fruit">{t('fruits')}</option>
          </select>
        </div>
        <div className="search-box">
          <Search size={18} />
          <input type="text" placeholder={`${t('search')}...`} value={searchQuery} onChange={handleSearchChange} />
        </div>
      </div>
      {category === 'all' ?
    // Original two-column layout for "all" category
    <div className="plants-container">
          <div className="plants-column">
            <h2>{t('vegetables')}</h2>
            <div className="plants-grid">
              {filteredPlants.vegetables.map(plant => <Card key={plant.id} className="plant-card">
                  <div className="plant-header">
                    <div className="plant-image">
                      <img src={plant.image} alt={plant.name} />
                    </div>
                    <div className="plant-title">
                      <h3>{plant.name}</h3>
                      <span className={`plant-status ${getStatusClass(plant.status)}`}>
                        {plant.status}
                      </span>
                    </div>
                  </div>
                  <div className="plant-summary">
                    <div className="plant-info">
                      <span className="info-label">{t('greenhouseId')}:</span>
                      <span className="info-value">{plant.greenhouseId}</span>
                    </div>
                    <div className="plant-info">
                      <span className="info-label">{t('expectedHarvest')}:</span>
                      <span className="info-value">{plant.expectedHarvest}</span>
                    </div>
                  </div>
                  <div className="plant-actions">
                    <button className="expand-button" onClick={() => togglePlantDetails(plant.id)}>
                      {expandedPlant === plant.id ? <>
                          <ChevronUp size={16} />
                          <span>Hide Details</span>
                        </> : <>
                          <ChevronDown size={16} />
                          <span>Show Details</span>
                        </>}
                    </button>
                  </div>
                  {expandedPlant === plant.id && <div className="plant-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">{t('category')}:</span>
                          <span className="detail-value">{plant.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('plantedDate')}:</span>
                          <span className="detail-value">{plant.plantedDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('expectedHarvest')}:</span>
                          <span className="detail-value">{plant.expectedHarvest}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('estimatedYield')}:</span>
                          <span className="detail-value">{plant.estimatedYield} kg</span>
                        </div>
                      </div>
                      <div className="detail-actions">
                        <Button variant="secondary" size="small" icon={<Edit size={14} />} onClick={() => console.log(`Edit ${plant.name}`)}>
                          {t('edit')}
                        </Button>
                        <Button variant="danger" size="small" icon={<Trash size={14} />} onClick={() => console.log(`Delete ${plant.name}`)}>
                          {t('delete')}
                        </Button>
                      </div>
                    </div>}
                </Card>)}
            </div>
          </div>
          <div className="plants-column">
            <h2>{t('fruits')}</h2>
            <div className="plants-grid">
              {filteredPlants.fruits.map(plant => <Card key={plant.id} className="plant-card">
                  <div className="plant-header">
                    <div className="plant-image">
                      <img src={plant.image} alt={plant.name} />
                    </div>
                    <div className="plant-title">
                      <h3>{plant.name}</h3>
                      <span className={`plant-status ${getStatusClass(plant.status)}`}>
                        {plant.status}
                      </span>
                    </div>
                  </div>
                  <div className="plant-summary">
                    <div className="plant-info">
                      <span className="info-label">{t('greenhouseId')}:</span>
                      <span className="info-value">{plant.greenhouseId}</span>
                    </div>
                    <div className="plant-info">
                      <span className="info-label">{t('expectedHarvest')}:</span>
                      <span className="info-value">{plant.expectedHarvest}</span>
                    </div>
                  </div>
                  <div className="plant-actions">
                    <button className="expand-button" onClick={() => togglePlantDetails(plant.id)}>
                      {expandedPlant === plant.id ? <>
                          <ChevronUp size={16} />
                          <span>Hide Details</span>
                        </> : <>
                          <ChevronDown size={16} />
                          <span>Show Details</span>
                        </>}
                    </button>
                  </div>
                  {expandedPlant === plant.id && <div className="plant-details">
                      <div className="details-grid">
                        <div className="detail-item">
                          <span className="detail-label">{t('category')}:</span>
                          <span className="detail-value">{plant.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('plantedDate')}:</span>
                          <span className="detail-value">{plant.plantedDate}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('expectedHarvest')}:</span>
                          <span className="detail-value">{plant.expectedHarvest}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">{t('estimatedYield')}:</span>
                          <span className="detail-value">{plant.estimatedYield} kg</span>
                        </div>
                      </div>
                      <div className="detail-actions">
                        <Button variant="secondary" size="small" icon={<Edit size={14} />} onClick={() => console.log(`Edit ${plant.name}`)}>
                          {t('edit')}
                        </Button>
                        <Button variant="danger" size="small" icon={<Trash size={14} />} onClick={() => console.log(`Delete ${plant.name}`)}>
                          {t('delete')}
                        </Button>
                      </div>
                    </div>}
                </Card>)}
            </div>
          </div>
        </div> :
    // Horizontal full-width layout for specific category
    <div className="plants-container-horizontal">
          <h2>{category === 'vegetable' ? t('vegetables') : t('fruits')}</h2>
          <div className="plants-grid-horizontal">
            {combinedPlants.map(plant => <Card key={plant.id} className="plant-card">
                <div className="plant-header">
                  <div className="plant-image">
                    <img src={plant.image} alt={plant.name} />
                  </div>
                  <div className="plant-title">
                    <h3>{plant.name}</h3>
                    <span className={`plant-status ${getStatusClass(plant.status)}`}>
                      {plant.status}
                    </span>
                  </div>
                </div>
                <div className="plant-summary">
                  <div className="plant-info">
                    <span className="info-label">{t('greenhouseId')}:</span>
                    <span className="info-value">{plant.greenhouseId}</span>
                  </div>
                  <div className="plant-info">
                    <span className="info-label">{t('expectedHarvest')}:</span>
                    <span className="info-value">{plant.expectedHarvest}</span>
                  </div>
                </div>
                <div className="plant-actions">
                  <button className="expand-button" onClick={() => togglePlantDetails(plant.id)}>
                    {expandedPlant === plant.id ? <>
                        <ChevronUp size={16} />
                        <span>Hide Details</span>
                      </> : <>
                        <ChevronDown size={16} />
                        <span>Show Details</span>
                      </>}
                  </button>
                </div>
                {expandedPlant === plant.id && <div className="plant-details">
                    <div className="details-grid">
                      <div className="detail-item">
                        <span className="detail-label">{t('category')}:</span>
                        <span className="detail-value">{plant.category}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">{t('plantedDate')}:</span>
                        <span className="detail-value">{plant.plantedDate}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">{t('expectedHarvest')}:</span>
                        <span className="detail-value">{plant.expectedHarvest}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">{t('estimatedYield')}:</span>
                        <span className="detail-value">{plant.estimatedYield} kg</span>
                      </div>
                    </div>
                    <div className="detail-actions">
                      <Button variant="secondary" size="small" icon={<Edit size={14} />} onClick={() => console.log(`Edit ${plant.name}`)}>
                        {t('edit')}
                      </Button>
                      <Button variant="danger" size="small" icon={<Trash size={14} />} onClick={() => console.log(`Delete ${plant.name}`)}>
                        {t('delete')}
                      </Button>
                    </div>
                  </div>}
              </Card>)}
          </div>
        </div>}
      {showModal && <Modal title={t('addNewPlant')} onClose={() => setShowModal(false)}>
          <form className="add-plant-form">
            <div className="form-group">
              <label htmlFor="plantName">{t('plantName')}</label>
              <input type="text" id="plantName" name="plantName" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">{t('category')}</label>
                <select id="category" name="category" required>
                  <option value="">Select Category</option>
                  <option value="Vegetable">{t('vegetables')}</option>
                  <option value="Fruit">{t('fruits')}</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="greenhouseId">{t('greenhouseId')}</label>
                <input type="text" id="greenhouseId" name="greenhouseId" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="length">{t('length')} (m)</label>
                <input type="number" id="length" name="length" min="1" required />
              </div>
              <div className="form-group">
                <label htmlFor="width">{t('width')} (m)</label>
                <input type="number" id="width" name="width" min="1" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location">{t('location')}</label>
              <input type="text" id="location" name="location" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="plantedDate">{t('plantedDate')}</label>
                <input type="date" id="plantedDate" name="plantedDate" required />
              </div>
              <div className="form-group">
                <label htmlFor="expectedHarvest">{t('expectedHarvest')}</label>
                <input type="date" id="expectedHarvest" name="expectedHarvest" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="estimatedYield">{t('estimatedYield')} (kg)</label>
              <input type="number" id="estimatedYield" name="estimatedYield" min="1" required />
            </div>
            <div className="form-group">
              <label htmlFor="plantImage">{t('uploadImage')}</label>
              <div className="image-upload">
                <label htmlFor="plantImage" className="upload-label">
                  <Upload size={18} />
                  <span>Choose file (JPG, PNG)</span>
                </label>
                <input type="file" id="plantImage" name="plantImage" accept=".jpg,.jpeg,.png" onChange={handleImageChange} />
                {imagePreview && <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="remove-image" onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}>
                      <X size={14} />
                    </button>
                  </div>}
              </div>
            </div>
            <div className="form-actions">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit" icon={<Check size={16} />} onClick={e => {
            e.preventDefault();
            console.log('Form submitted');
            setShowModal(false);
          }}>
                {t('submit')}
              </Button>
            </div>
          </form>
        </Modal>}
    </div>;
};
export default GreenhouseManagement;