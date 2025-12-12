package com.whatsub.presentation.controller;

import com.whatsub.application.SubscribeService;
import com.whatsub.domain.Subscribe;
import com.whatsub.presentation.dto.CreateSubscribeRequest;
import com.whatsub.presentation.dto.EditSubscribeRequest;
import com.whatsub.presentation.dto.SubscribeList;
import com.whatsub.presentation.dto.SubscribeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/subscribes")
@RequiredArgsConstructor
public class SubscribeController {
    private final SubscribeService subscribeService;

    @PostMapping
    public ResponseEntity<SubscribeResponse> createSub(@RequestBody CreateSubscribeRequest request) {
        Subscribe created = subscribeService.createSubscribe(request);

        SubscribeResponse response = new SubscribeResponse(created);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubscribeResponse> editSub(
            @PathVariable Long id,
            @RequestBody CreateSubscribeRequest request
    ){
        Subscribe edited = subscribeService.editSubscribe(id, request);
        SubscribeResponse response = new SubscribeResponse(edited);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SubscribeList>> subscribeList(@RequestParam Long memberId) {
        return ResponseEntity.ok(subscribeService.subscribeList(memberId));
    }
}
