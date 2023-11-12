"""add_new_group_index_column_question_group_table

Revision ID: 5fc04f661f4c
Revises: 2257b639c2f7
Create Date: 2023-11-11 08:40:28.058766

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5fc04f661f4c'
down_revision: Union[str, None] = '2257b639c2f7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('question_groups', sa.Column('group_index', sa.Integer, nullable=True))


def downgrade() -> None:
    op.drop_column('question_groups', 'group_index')
