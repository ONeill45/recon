DELETE FROM public.resource_skill;
DELETE FROM public.project_skill;
DELETE FROM public.skill;
DELETE FROM public.skill_category;
DELETE FROM public.resource_allocation;
DELETE FROM public.resource;
DELETE FROM public.project;
DELETE FROM public.department;
DELETE FROM public.client;

INSERT INTO public.client
(id, client_name, description, logo_url, start_date, end_date, created_date, created_by, updated_date, updated_by, deleted_date, deleted_by)
VALUES
(uuid_generate_v4(), 'DuzyTV', 'Video Commerce Engine', 'http://duzytv.com/wp-content/uploads/2020/03/duzy-dark-teal@189x64.png', '2019-10-01', '2020-10-01', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Anthem', 'Healthcare Industry', 'https://www.antheminc.com/cs/groups/wellpoint/@wp_news_main/documents/wlp_assets/d19l/mji2/~edisp/pw_e226255.jpg', '2018-10-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Walmart', 'Multinational Retail Corporation', 'https://pbs.twimg.com/profile_images/1280969404071673856/nmC_sV9l.jpg', '2021-06-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Kroger', 'American retail company founded by Bernard Kroger in 1883 in Cincinnati, Ohio.', 'data:image/png;base64,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', '2019-06-01', '2021-04-01', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Ascendum', 'IT Talent Agency', 'https://media-exp1.licdn.com/dms/image/C560BAQHJ1XebNhG66A/company-logo_200_200/0/1600356888813?e=1622678400&v=beta&t=EvYjM4tZutx344dY5lLR0Gyv1ZyFt4H7tLXaVZfDLSc', '2008-01-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'CognitiveScale', 'AI powered digital systems', 'https://sharespost-sharex-production.s3.us-west-2.amazonaws.com/uploads/issuer/100001673/logo/cognitive_scale.png', '2020-07-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Jewlery TV', 'TV Jewlery Sales', 'https://sharespost-sharex-production.s3.us-west-2.amazonaws.com/uploads/issuer/100001673/logo/cognitive_scale.png', '2020-07-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Foot Locker', 'E-commerce shoe company', 'https://sharespost-sharex-production.s3.us-west-2.amazonaws.com/uploads/issuer/100001673/logo/cognitive_scale.png', '2020-07-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Goddard Schools', 'Schools offering quality educations', 'https://sharespost-sharex-production.s3.us-west-2.amazonaws.com/uploads/issuer/100001673/logo/cognitive_scale.png', '2020-07-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Xavier U', 'Private University in Cincinnati', 'https://sharespost-sharex-production.s3.us-west-2.amazonaws.com/uploads/issuer/100001673/logo/cognitive_scale.png', '2020-07-01', null, now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null);

INSERT INTO public.department
(id, name, created_date, created_by, updated_date, updated_by, deleted_date, deleted_by)
VALUES
(uuid_generate_v4(), 'Data Analytics', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Design', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Development Services', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Development Operations', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Project Management', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Quality Assurance', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null);

INSERT INTO public.project 
(id, project_name, start_date, end_date, project_type, confidence, priority, created_date, created_by, updated_date, updated_by, deleted_date, deleted_by, client_id)
VALUES
(uuid_generate_v4(), 'Duzy Admin', '2019-10-01', '2020-10-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'DuzyTV' )),
(uuid_generate_v4(), 'Work OS', '2019-01-01', '2020-01-01', 'fixed bid', 100, 'Medium', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Anthem' )),
(uuid_generate_v4(), 'Recon', '2020-01-01', '2021-01-01', 'internal', 100, 'Low', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Ascendum' )),
(uuid_generate_v4(), 'Cortex v6', '2021-01-01', '2021-04-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'CognitiveScale' )),
(uuid_generate_v4(), 'JTV', '2019-06-01', '2021-04-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Jewlery TV' )),
(uuid_generate_v4(), 'Foot Locker', '2019-01-01', '2021-04-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Foot Locker' )),
(uuid_generate_v4(), 'TCE', '2019-01-01', '2019-11-05', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Ascendum' )),
(uuid_generate_v4(), 'MagPie', '2020-07-01', '2021-01-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Ascendum' )),
(uuid_generate_v4(), 'UXD', '2020-01-01', '2020-12-31', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Anthem' )),
(uuid_generate_v4(), 'Goddard Schools', '2019-08-01', '2021-02-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Goddard Schools' )),
(uuid_generate_v4(), 'Xavier University', '2018-08-01', '2020-06-01', 'fixed bid', 100, 'High', now(), '', now(), '', null, null, (SELECT id FROM public.client WHERE client_name = 'Xavier U' ));

INSERT INTO public.resource
(id, first_name, last_name, preferred_name, start_date, termination_date, title, email, image_url, department_id, created_date, created_by, updated_date, updated_by, deleted_date, deleted_by)
VALUES
(uuid_generate_v4(), 'Craig', 'Samad', null, '2019-12-30', null, 'Software Engineer', 'craig.samad@ascendum.com', 'https://cdn.bulbagarden.net/upload/6/6b/179Mareep.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Darren', 'Dougherty', 'Scott', '2019-12-30', null, 'Software Engineer', 'scott.dougherty@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/02/129Magikarp.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Michelle', 'Ching', 'Kealoha', '2019-08-15', null, 'Software Engineer', 'kealoha.ching@ascendum.com', 'https://cdn.bulbagarden.net/upload/thumb/b/b9/172Pichu.png/250px-172Pichu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Pankti', 'Patel', null, '2018-10-02', null, 'Software Engineer', 'pankti.patel@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Former', 'Employee', null, '2016-05-22', '2018-06-21', 'Project Manager', 'former.employee@ascendum.com', null, (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Colin', 'Ferris', null, '2019-07-29', null, 'Software Engineer', 'colin.ferris@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Josh', 'Marston', null, '2019-07-30', null, 'Software Engineer', 'josh.marston@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Operations'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Alex', 'Knipfer', null, '2018-02-16', null, 'Software Engineer', 'alex.knipfer@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Amy', 'Dennison', null, '2017-06-30', null, 'Project Manager', 'amy.dennison@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Project Management'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Sawson', 'Salehpour', null, '2019-09-16', null, 'Software Engineer', 'sawson.salehpour@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Operations'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Tyler', 'Knipfer', null, '2017-06-16', null, 'Software Engineer', 'tyler.knipfer@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Data Analytics'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Aaron', 'Koenig', null, '2017-06-16', null, 'Software Engineer', 'aaron.koenig@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Operations'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Philip', 'Loeffler', null, '2017-06-16', null, 'Software Engineer', 'philip.loeffler@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Paige', 'Warman', null, '2017-06-16', null, 'Designer', 'paige.warman@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Design'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Kristen', 'Rohrkasse', null, '2017-06-16', null, 'Designer', 'kristen.rohrkasse@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Design'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Gary', 'Howe', null, '2017-06-16', null, 'Software Engineer', 'gary.howe@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Design'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Raliat', 'Akinlolu', null, '2017-06-16', null, 'Project Manager', 'raliat.akinlolu@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Project Management'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Nathan', 'Wiles', null, '2020-06-16', null, 'Software Engineer', 'nathan.wiles@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Operations'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Justin', 'Dudley', null, '2017-06-16', null, 'Software Engineer', 'justin.dudley@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Joey', 'Fenny', null, '2017-06-16', null, 'Software Engineer', 'joey.fenny@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Development Services'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null),
(uuid_generate_v4(), 'Bhawana', 'Yadav', null, '2017-06-16', null, 'Designer', 'bhawana.yadav@ascendum.com', 'https://cdn.bulbagarden.net/upload/0/0d/025Pikachu.png', (SELECT id FROM public.department WHERE name = 'Design'), now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', now(), '29ad5159-bbca-4ca0-82b1-6e6c3fdfbe05', null, null);

INSERT INTO public.resource_allocation
(id, start_date, end_date, end_reason, percentage, created_date, created_by, updated_date, updated_by, deleted_date, deleted_by, resource_id, project_id)
VALUES(uuid_generate_v4(), '2020-01-01', '2020-09-28', 'Project Ended', 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Craig' AND last_name = 'Samad'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2021-03-20', '2021-07-15', null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Craig' AND last_name = 'Samad'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2020-01-01', '2020-09-28', 'Project Ended', 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Darren' AND last_name = 'Dougherty'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2021-05-20', '2021-06-05', 'Allocation Changed', 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Darren' AND last_name = 'Dougherty'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2021-05-15', '2021-06-12', null, 20, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Darren' AND last_name = 'Dougherty'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2021-03-01', null, null, 80, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Darren' AND last_name = 'Dougherty'), (SELECT id FROM public.project WHERE project_name = 'Work OS')),
(uuid_generate_v4(), '2019-10-01', '2020-09-28', 'Project Ended', 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Michelle' AND last_name = 'Ching'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2021-05-25', '2021-08-12', null, 50, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Michelle' AND last_name = 'Ching'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2020-11-20', null, null, 50, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Michelle' AND last_name = 'Ching'), (SELECT id FROM public.project WHERE project_name = 'Cortex v6')),
(uuid_generate_v4(), '2021-02-01', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Pankti' AND last_name = 'Patel'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2021-03-01', '2021-07-01', null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Colin' AND last_name = 'Ferris'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2019-07-01', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Alex' AND last_name = 'Knipfer'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2020-11-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Tyler' AND last_name = 'Knipfer'), (SELECT id FROM public.project WHERE project_name = 'Work OS')),
(uuid_generate_v4(), '2020-10-05', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Sawson' AND last_name = 'Salehpour'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2020-08-29', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Josh' AND last_name = 'Marston'), (SELECT id FROM public.project WHERE project_name = 'Cortex v6')),
(uuid_generate_v4(), '2020-11-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Amy' AND last_name = 'Dennison'), (SELECT id FROM public.project WHERE project_name = 'Cortex v6')),
(uuid_generate_v4(), '2020-11-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Colin' AND last_name = 'Ferris'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2020-02-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Aaron' AND last_name = 'Koenig'), (SELECT id FROM public.project WHERE project_name = 'Cortex v6')),
(uuid_generate_v4(), '2020-05-07', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Philip' AND last_name = 'Loeffler'), (SELECT id FROM public.project WHERE project_name = 'Work OS')),
(uuid_generate_v4(), '2019-06-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Paige' AND last_name = 'Warman'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2020-08-01', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Kristin' AND last_name = 'Rohrkasse'), (SELECT id FROM public.project WHERE project_name = 'Cortex v6')),
(uuid_generate_v4(), '2018-07-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Gary' AND last_name = 'Howe'), (SELECT id FROM public.project WHERE project_name = 'Work OS')),
(uuid_generate_v4(), '2020-04-20', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Raliat' AND last_name = 'Akinlolu'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2019-08-05', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Nathan' AND last_name = 'Wiles'), (SELECT id FROM public.project WHERE project_name = 'Work OS')),
(uuid_generate_v4(), '2020-10-31', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Colin' AND last_name = 'Ferris'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2020-01-07', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Justin' AND last_name = 'Dudley'), (SELECT id FROM public.project WHERE project_name = 'Duzy Admin')),
(uuid_generate_v4(), '2020-01-01', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Joey' AND last_name = 'Fenny'), (SELECT id FROM public.project WHERE project_name = 'Recon')),
(uuid_generate_v4(), '2020-03-14', null, null, 100, now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', now(), 'b426dc70-433e-45ec-943c-1cf3d10a7a1d', null, null, (SELECT id FROM public.resource WHERE first_name = 'Bhawana' AND last_name = 'Yadav'), (SELECT id FROM public.project WHERE project_name = 'Recon'));

INSERT INTO public.skill_category
(id, skill_category_name)
VALUES(uuid_generate_v4(), 'Technical');

INSERT INTO public.skill
(id, skill_name, category_id)
VALUES(uuid_generate_v4(), 'React', (SELECT id FROM public.skill_category WHERE skill_category_name = 'Technical'));

INSERT INTO public.resource_skill
(id, resource_id, skill_id, skill_value)
VALUES(uuid_generate_v4(), (SELECT id FROM public.resource WHERE email = 'craig.samad@ascendum.com'), (SELECT id FROM public.skill WHERE skill_name = 'React'), 75);

INSERT INTO public.project_skill
(id, project_id, skill_id, skill_value)
VALUES(uuid_generate_v4(), (SELECT id FROM public.project WHERE project_name = 'Recon'), (SELECT id FROM public.skill WHERE skill_name = 'React'), 50);