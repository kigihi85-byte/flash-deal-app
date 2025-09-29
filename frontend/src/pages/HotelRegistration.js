import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Upload, 
  Plus, 
  Save,
  ArrowLeft,
  Building,
  Users,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterContainer = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem 0;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  color: #374151;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 2rem;
  
  &:hover {
    border-color: #dc2626;
    color: #dc2626;
  }
`;

const RegisterCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #1f2937;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: #ffffff;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const ImageUploadArea = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #dc2626;
    background: #fef2f2;
  }
`;

const UploadIcon = styled.div`
  color: #9ca3af;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
`;

const ImagePreview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const HotelRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotelName: '',
    description: '',
    address: '',
    city: '',
    country: '',
    originalPrice: '',
    discountPercentage: '',
    totalRooms: '',
    amenities: '',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    images: []
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('숙소가 성공적으로 등록되었습니다!');
      navigate('/');
    } catch (error) {
      toast.error('숙소 등록 중 오류가 발생했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <Container>
        <BackButton onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          홈으로 돌아가기
        </BackButton>

        <RegisterCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>숙소 등록</Title>
          <Subtitle>새로운 특가 숙소를 등록해보세요</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <Building size={20} />
                기본 정보
              </SectionTitle>
              
              <FormGroup>
                <FormLabel>호텔명 *</FormLabel>
                <FormInput
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleInputChange}
                  placeholder="호텔명을 입력하세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>호텔 설명 *</FormLabel>
                <FormTextarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="호텔에 대한 상세한 설명을 입력하세요"
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <FormLabel>주소 *</FormLabel>
                  <FormInput
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="상세 주소"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>도시 *</FormLabel>
                  <FormInput
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="도시명"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>국가 *</FormLabel>
                <FormSelect
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">국가를 선택하세요</option>
                  <option value="South Korea">대한민국</option>
                  <option value="Japan">일본</option>
                  <option value="Taiwan">대만</option>
                  <option value="Hong Kong">홍콩</option>
                  <option value="Singapore">싱가포르</option>
                  <option value="Thailand">태국</option>
                  <option value="Malaysia">말레이시아</option>
                  <option value="Philippines">필리핀</option>
                  <option value="Indonesia">인도네시아</option>
                  <option value="Vietnam">베트남</option>
                </FormSelect>
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <DollarSign size={20} />
                가격 정보
              </SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>원가 *</FormLabel>
                  <FormInput
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="원래 가격"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>할인율 *</FormLabel>
                  <FormInput
                    type="number"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleInputChange}
                    placeholder="할인율 (%)"
                    min="1"
                    max="99"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>총 객실 수 *</FormLabel>
                <FormInput
                  type="number"
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  placeholder="사용 가능한 객실 수"
                  min="1"
                  required
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <Calendar size={20} />
                운영 정보
              </SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <FormLabel>체크인 시간</FormLabel>
                  <FormInput
                    type="time"
                    name="checkInTime"
                    value={formData.checkInTime}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>체크아웃 시간</FormLabel>
                  <FormInput
                    type="time"
                    name="checkOutTime"
                    value={formData.checkOutTime}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>편의시설</FormLabel>
                <FormTextarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="WiFi, 수영장, 피트니스, 레스토랑 등"
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <Upload size={20} />
                호텔 이미지
              </SectionTitle>
              
              <ImageUploadArea onClick={() => document.getElementById('imageUpload').click()}>
                <UploadIcon>
                  <Upload size={32} />
                </UploadIcon>
                <UploadText>
                  클릭하여 이미지를 업로드하세요
                  <br />
                  최대 5장까지 업로드 가능합니다
                </UploadText>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </ImageUploadArea>

              {formData.images.length > 0 && (
                <ImagePreview>
                  {formData.images.map((image, index) => (
                    <PreviewImage key={index} src={image} alt={`호텔 이미지 ${index + 1}`} />
                  ))}
                </ImagePreview>
              )}
            </FormSection>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  등록 중...
                </>
              ) : (
                <>
                  <Save size={20} />
                  숙소 등록하기
                </>
              )}
            </SubmitButton>
          </Form>
        </RegisterCard>
      </Container>
    </RegisterContainer>
  );
};

export default HotelRegistration;

