<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - 플래시딜</title>
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
        .login-container {
            max-width: 400px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        .login-card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        .login-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        .login-body {
            padding: 2rem;
        }
        .form-control:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
        .btn-login {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            color: white;
            padding: 12px;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
        }
        .btn-login:hover {
            background: linear-gradient(45deg, #764ba2, #667eea);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        .btn-register {
            background: transparent;
            border: 2px solid #667eea;
            color: #667eea;
            padding: 10px;
            border-radius: 25px;
            font-weight: bold;
            width: 100%;
            transition: all 0.3s ease;
        }
        .btn-register:hover {
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
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h2><i class="fas fa-bolt"></i> 플래시딜</h2>
                <p class="mb-0">숙박 특가에 로그인하세요</p>
            </div>
            
            <div class="login-body">
                <div id="alertContainer"></div>
                
                <form id="loginForm">
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
                                   placeholder="비밀번호를 입력하세요" required>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-login mb-3">
                        <i class="fas fa-sign-in-alt"></i> 로그인
                    </button>
                </form>
                
                <div class="text-center">
                    <p class="text-muted mb-3">아직 계정이 없으신가요?</p>
                    <a href="/register" class="btn btn-register">
                        <i class="fas fa-user-plus"></i> 회원가입
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
        // 로그인 폼 제출
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert('로그인 성공! 대시보드로 이동합니다.', 'success');
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 1500);
                } else {
                    showAlert(data.message || '로그인에 실패했습니다.', 'danger');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showAlert('로그인 중 오류가 발생했습니다.', 'danger');
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
