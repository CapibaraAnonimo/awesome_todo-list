PGDMP  3                    |           awesome_todo-list    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16397    awesome_todo-list    DATABASE     �   CREATE DATABASE "awesome_todo-list" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
 #   DROP DATABASE "awesome_todo-list";
                postgres    false                        3079    16398 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            T           1247    16503    task_status_enum    TYPE     \   CREATE TYPE public.task_status_enum AS ENUM (
    'TO-DO',
    'IN_PROGRESS',
    'DONE'
);
 #   DROP TYPE public.task_status_enum;
       public          postgres    false            �            1259    16510    task    TABLE     N  CREATE TABLE public.task (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(60) NOT NULL,
    description character varying NOT NULL,
    status public.task_status_enum DEFAULT 'TO-DO'::public.task_status_enum NOT NULL,
    "creationDate" timestamp without time zone NOT NULL,
    "User_id" uuid
);
    DROP TABLE public.task;
       public         heap    postgres    false    2    852    852            �            1259    16519    user    TABLE       CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(30) NOT NULL,
    username character varying(30) NOT NULL,
    password character varying(15) NOT NULL,
    email character varying(30) NOT NULL
);
    DROP TABLE public."user";
       public         heap    postgres    false    2            �          0    16510    task 
   TABLE DATA           Y   COPY public.task (id, title, description, status, "creationDate", "User_id") FROM stdin;
    public          postgres    false    216   �       �          0    16519    user 
   TABLE DATA           E   COPY public."user" (id, name, username, password, email) FROM stdin;
    public          postgres    false    217   �       1           2606    16524 #   user PK_cace4a159ff9f2512dd42373760 
   CONSTRAINT     e   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
       public            postgres    false    217            /           2606    16518 #   task PK_fb213f79ee45060ba925ecd576e 
   CONSTRAINT     c   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY (id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "PK_fb213f79ee45060ba925ecd576e";
       public            postgres    false    216            2           2606    16525 #   task FK_2f71d20faf8b17cc7c4d4dac437    FK CONSTRAINT     �   ALTER TABLE ONLY public.task
    ADD CONSTRAINT "FK_2f71d20faf8b17cc7c4d4dac437" FOREIGN KEY ("User_id") REFERENCES public."user"(id);
 O   ALTER TABLE ONLY public.task DROP CONSTRAINT "FK_2f71d20faf8b17cc7c4d4dac437";
       public          postgres    false    216    4657    217            �   �   x���1N1 �z���ǎ�i�5'��؉#��{��ک�J��2!zw`�l�Cu�Z�dl��������~|�<��p���u#$�@r�~a���l+,e�1�Vx-�0�@�FFD��^�l��� `"�@�<\�\���@9��c�Z�B�R��n��Ȩ�5y�>�'⃁�s��?_e�      �   �   x�u�1�0��9���qg�{�ĩ#1�A۱���I��䘀��Je��#W*�Ԧ����m���J��c<��޹א�Zt)�J��&�G֡�]s=��Dθ�ʠ�*�Vi굻�y�~�|�!�t�HS     