package com.chibbol.wtz.domain.room.service;


import com.chibbol.wtz.domain.room.dto.DataDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate stompRedisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    // redis에서 메세지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메세지를 받아 처리
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            log.info("");
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) stompRedisTemplate.getStringSerializer().deserialize(message.getBody());
            // ChatMessageDTO 객체로 매핑
            DataDTO dataDTO = objectMapper.readValue(publishMessage, DataDTO.class);
            // websocket 구독자에게 채팅 메세지 보낸다
            messagingTemplate.convertAndSend("/sub/room/" + dataDTO.getRoomCode(), dataDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
