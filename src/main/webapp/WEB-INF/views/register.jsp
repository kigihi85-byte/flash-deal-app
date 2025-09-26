<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입 - 플래시딜</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .register-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        .register-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .register-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        .register-body {
            padding: 2rem;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .btn-register {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            color: white;
            padding: 12px;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
        }
        .btn-register:hover {
            background: linear-gradient(45deg, #764ba2, #667eea);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        .btn-login {
            background: transparent;
            border: 2px solid #667eea;
            color: #667eea;
            padding: 10px;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
        }
        .btn-login:hover {
            background: #667eea;
            color: white;
        }
        .input-group-text {
            background: #f8f9fa;
            border-color: #dee2e6;
        }
        .alert {
            border-radius: 10px;
        }
        .password-strength {
            height: 4px;
            border-radius: 2px;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
        }
        .strength-weak { background: #dc3545; width: 25%; }
        .strength-medium { background: #ffc107; width: 50%; }
        .strength-strong { background: #28a745; width: 75%; }
        .strength-very-strong { background: #20c997; width: 100%; }
    </style>
</head>
<body>
    <div class="register-container">
        <div class="register-card">
            <div class="register-header">
                <h2><i class="fas fa-user-plus"></i> 회원가입</h2>
                <p class="mb-0">플래시딜에 가입하고 특가를 만나보세요</p>
            </div>
            
            <div class="register-body">
                <div id="alertContainer"></div>
                
                <form id="registerForm">
                    <div class="mb-3">
                        <label class="form-label">이메일</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            <input type="email" class="form-control" name="email" 
                                   placeholder="example@email.com" required>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">비밀번호</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input type="password" class="form-control" name="password" 
                                   placeholder="6자 이상 입력하세요" required minlength="6">
                        </div>
                        <div class="password-strength" id="passwordStrength"></div>
                        <small class="text-muted">비밀번호는 6자 이상이어야 합니다</small>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">이름</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                            <input type="text" class="form-control" name="name" 
                                   placeholder="홍길동" required minlength="2" maxlength="50">
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">전화번호</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-phone"></i></span>
                            <input type="tel" class="form-control" name="phone" 
                                   placeholder="010-1234-5678" pattern="01[0-9]-[0-9]{4}-[0-9]{4}">
                        </div>
                        <small class="text-muted">선택사항입니다</small>
                    </div>
                    
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="agreeTerms" required>
                        <label class="form-check-label" for="agreeTerms">
                            <a href="#" class="text-decoration-none">이용약관</a> 및 
                            <a href="#" class="text-decoration-none">개인정보처리방침</a>에 동의합니다
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-register mb-3">
                        <i class="fas fa-user-plus"></i> 회원가입
                    </button>
                </form>
                
                <div class="text-center">
                    <p class="text-muted mb-3">이미 계정이 있으신가요?</p>
                    <a href="/login" class="btn btn-login">
                        <i class="fas fa-sign-in-alt"></i> 로그인
                    </a>
                </div>
                
                <div class="text-center mt-3">
                    <a href="/" class="text-muted text-decoration-none">
                        <i class="fas fa-arrow-left"></i> 메인으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // 비밀번호 강도 체크
        document.querySelector('input[name="password"]').addEventListener('input', function(e) {
            const password = e.target.value;
            const strengthBar = document.getElementById('passwordStrength');
            
            let strength = 0;
            if (password.length >= 6) strength++;
            if (password.match(/[a-z]/)) strength++;
            if (password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;
            
            strengthBar.className = 'password-strength';
            if (strength <= 1) {
                strengthBar.classList.add('strength-weak');
            } else if (strength <= 2) {
                strengthBar.classList.add('strength-medium');
            } else if (strength <= 3) {
                strengthBar.classList.add('strength-strong');
            } else {
                strengthBar.classList.add('strength-very-strong');
            }
        });
        
        // 회원가입 폼 제출
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert('회원가입 성공! 로그인 페이지로 이동합니다.', 'success');
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                } else {
                    showAlert(data.message || '회원가입에 실패했습니다.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('회원가입 중 오류가 발생했습니다.', 'danger');
            });
        });
        
        function showAlert(message, type) {
            const alertContainer = document.getElementById('alertContainer');
            alertContainer.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        }
    </script>
</body>
</html>
