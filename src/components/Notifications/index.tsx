import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { FaBell } from 'react-icons/fa';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { api } from '../../services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

interface INotification {
  id: string;
  content: string;
  recipient_id: string;
  establishment_id: string;
  read: boolean;
  created_at: string;
  timeDistance: string;
}

export const Notifications: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const hasUnread = useMemo(() => {
    return notifications.some(notification => notification.read === false);
  }, [notifications]);

  function loadNotifications() {
    api
      .get<INotification[]>(`/notifications`)
      .then(response => {
        const data = response.data.map(notification => {
          return {
            ...notification,
            timeDistance: formatDistance(
              parseISO(notification.created_at),
              new Date(),
              {
                addSuffix: true,
                locale: pt,
              },
            ),
          };
        });
        setNotifications(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      loadNotifications();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleMarkAsRead = useCallback(async (id: string) => {
    await api.patch(`/notifications/${id}`);

    setNotifications(prevState => {
      return prevState.map(item =>
        item.id === id ? { ...item, read: true } : item,
      );
    });
  }, []);

  return (
    <Container>
      <Badge
        onClick={handleToggleVisible}
        hasUnread={hasUnread}
        className="notification"
      >
        <FaBell
          color="#a3a3a3"
          size={20}
          className="notification_icon"
          title="Notificações"
        />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <Notification key={notification.id} unread={!notification.read}>
                <p>{notification.content}</p>
                <time>{notification.timeDistance}</time>
                {!notification.read && (
                  <button
                    type="button"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Marcar como lida
                  </button>
                )}
              </Notification>
            ))
          ) : (
            <h4>Sem notificações</h4>
          )}
        </Scroll>
      </NotificationList>
    </Container>
  );
};
