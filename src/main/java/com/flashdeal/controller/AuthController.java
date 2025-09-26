package com.flashdeal.controller;

import com.flashdeal.dto.LoginRequest;
import com.flashdeal.dto.RegisterRequest;
import com.flashdeal.entity.User;
import com.flashdeal.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
@Api(tags = "인증 API")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/login")
    @ApiOperation(value = "로그인 페이지", notes = "로그인 페이지를 반환합니다.")
    public String loginPage() {
        return "login";
    }
    
    @GetMapping("/register")
    @ApiOperation(value = "회원가입 페이지", notes = "회원가입 페이지를 반환합니다.")
    public String registerPage() {
        return "register";
    }
    
    @PostMapping("/api/login")
    @ResponseBody
    @ApiOperation(value = "로그인", notes = "이메일과 비밀번호로 로그인합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "로그인 성공"),
        @ApiResponse(code = 400, message = "로그인 실패")
    })
    public ResponseEntity<?> login(
            @ApiParam(value = "로그인 요청 데이터", required = true)
            @Valid @RequestBody LoginRequest request,
            BindingResult bindingResult,
            HttpSession session) {
        
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            User user = userService.login(request);
            
            // 세션에 사용자 정보 저장
            session.setAttribute("userId", user.getId());
            session.setAttribute("userName", user.getName());
            session.setAttribute("userEmail", user.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "로그인 성공");
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail()
            ));
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/api/register")
    @ResponseBody
    @ApiOperation(value = "회원가입", notes = "새로운 사용자를 등록합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "회원가입 성공"),
        @ApiResponse(code = 400, message = "회원가입 실패")
    })
    public ResponseEntity<?> register(
            @ApiParam(value = "회원가입 요청 데이터", required = true)
            @Valid @RequestBody RegisterRequest request,
            BindingResult bindingResult) {
        
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("입력 데이터가 올바르지 않습니다.");
        }
        
        try {
            User user = userService.register(request);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "회원가입 성공");
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail()
            ));
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/api/logout")
    @ResponseBody
    @ApiOperation(value = "로그아웃", notes = "현재 세션을 종료합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "로그아웃 성공")
    })
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "로그아웃 성공");
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/api/user/me")
    @ResponseBody
    @ApiOperation(value = "현재 사용자 정보", notes = "현재 로그인한 사용자의 정보를 반환합니다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "사용자 정보 조회 성공"),
        @ApiResponse(code = 401, message = "로그인이 필요합니다")
    })
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        UUID userId = (UUID) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }
        
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(401).body("사용자를 찾을 수 없습니다.");
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhone());
        response.put("createdAt", user.getCreatedAt());
        
        return ResponseEntity.ok(response);
    }
}
