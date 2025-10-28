import jsPDF from 'jspdf';

export const generateReceiptPDF = (bookingData, userData) => {
  const doc = new jsPDF();
  
  // PDF 설정
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // 색상 정의
  const primaryColor = [220, 38, 38]; // #dc2626
  const secondaryColor = [107, 114, 128]; // #6b7280
  const lightGray = [243, 244, 246]; // #f3f4f6
  
  // 헤더
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 30, 'F');
  
  // 로고 영역
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('FlashDeal', 20, 20);
  
  // 제목
  doc.setTextColor(...primaryColor);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Booking Confirmation', pageWidth / 2, 50, { align: 'center' });
  
  // 예약 번호
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.text(`Booking Number: ${bookingData.bookingId}`, pageWidth / 2, 60, { align: 'center' });
  
  // 구분선
  doc.setDrawColor(...lightGray);
  doc.line(20, 70, pageWidth - 20, 70);
  
  let yPosition = 85;
  
  // 고객 정보
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Customer Information', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Name: ${userData.fullName}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Email: ${userData.email}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Booking Date: ${bookingData.bookingDate}`, 20, yPosition);
  
  yPosition += 20;
  
  // 호텔 정보
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Hotel Information', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Hotel: ${bookingData.hotelName}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Check-in: ${bookingData.checkIn}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Check-out: ${bookingData.checkOut}`, 20, yPosition);
  yPosition += 8;
  doc.text(`Duration: ${bookingData.nights} nights ${bookingData.nights + 1} days`, 20, yPosition);
  yPosition += 8;
  doc.text(`Rooms: ${bookingData.rooms} room(s)`, 20, yPosition);
  yPosition += 8;
  doc.text(`Guests: ${bookingData.guests} adult(s)`, 20, yPosition);
  
  yPosition += 20;
  
  // 결제 정보
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information', 20, yPosition);
  
  yPosition += 15;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Method: ${bookingData.paymentMethod}`, 20, yPosition);
  yPosition += 8;
  
  // 총 금액 (강조)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...primaryColor);
  doc.text(`Total Amount: ${formatPrice(bookingData.totalPrice)}`, 20, yPosition);
  
  yPosition += 25;
  
  // 구분선
  doc.setDrawColor(...lightGray);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  
  yPosition += 15;
  
  // 주의사항
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...secondaryColor);
  doc.text('Important Notes:', 20, yPosition);
  yPosition += 8;
  doc.text('• Check-in time: After 3:00 PM', 20, yPosition);
  yPosition += 6;
  doc.text('• Check-out time: Before 11:00 AM', 20, yPosition);
  yPosition += 6;
  doc.text('• Cancellation is possible until 24 hours before check-in', 20, yPosition);
  yPosition += 6;
  doc.text('• For inquiries, please contact customer service', 20, yPosition);
  
  yPosition += 20;
  
  // 푸터
  doc.setDrawColor(...lightGray);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  
  yPosition += 10;
  doc.setFontSize(8);
  doc.setTextColor(...secondaryColor);
  doc.text('FlashDeal - Trusted Accommodation Deal Platform', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 6;
  doc.text('Customer Service: 1588-0000 | Email: support@flashdeal.com', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 6;
  doc.text('Please keep this receipt for booking confirmation', pageWidth / 2, yPosition, { align: 'center' });
  
  return doc;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(price);
};

export const downloadReceipt = (bookingData, userData) => {
  const doc = generateReceiptPDF(bookingData, userData);
  const fileName = `receipt_${bookingData.bookingId}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
